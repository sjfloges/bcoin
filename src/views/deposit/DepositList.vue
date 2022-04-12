<template>
  <div class="container">
    <div class="row">
      <div class="col col-12">

        <app-card>
          <card-overlay v-if="recentDepositsResponse" />

          <div class="d-flex align-items-start align-items-sm-center mb-2">
            <h2 class="m-0 pr-1">
              <i class="fas fa-hourglass-half mr-75 clr-primary opacity-85" />
              <span class="clr-dark">Pending Deposits</span>
            </h2>
            <router-link
              v-if="user.payments"
              :to="{ name: 'DepositNew'}"
              tag="button"
              v-waves
              class="btn btn-primary btn-medium ml-auto">
              <i class="fas fa-plus" />
              <span class="ml-75 d-none d-sm-block">Make a New Deposit</span>
            </router-link>
            <div
              v-else
              class="d-flex align-items-center ml-auto">
              <button
                disabled
                class="btn btn-small">
                <i class="fas fa-plus" />
                <span class="ml-50 d-none d-sm-block">Make a New Deposit</span>
              </button>
              <i
                v-tippy="{ placement: 'left', interactive: true }"
                content="You don't have rights to make a new deposit. Please provide <span class='font-weight-500'>billing information</span> in <a href='../settings'>account settings</a>."
                class="far fa-question-circle fa-lg clr-info ml-50" />
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-accented">
              <thead>
                <tr>
                  <th
                    v-for="(column, index) in depositsColumns"
                    :key="column.title"
                    :class="index + 1 === depositsColumns.length ? 'text-right' : ''">
                    <span>{{ column.title }}</span>
                  </th>
                </tr>
              </thead>
              <tbody v-if="recentDeposits.length > 0">
                <tr
                  v-for="deposit in recentDeposits"
                  :key="`recentDeposit-${deposit.id}`">
                  <td>
                    <i class="far fa-calendar-alt mr-50 clr-black" />
                    <span>{{ deposit.datetime | moment("DD.MM.YYYY") }}</span>
                    <i class="far fa-clock ml-1 mr-50 clr-black" />
                    <span>{{ deposit.datetime | moment("hh:mm") }}</span>
                  </td>
                  <td>
                    {{ deposit.amount | commaValue }}
                  </td>
                  <td>
                    #{{ deposit.id }}
                  </td>
                  <td class="text-capitalize">
                    <app-badge
                      :text="deposit.status_label"
                      :type="badgeType(deposit.status)" />
                  </td>
                  <td class="text-capitalize">
                    <i class="far fa-calendar-alt mr-50 clr-black" />
                    <span>{{ deposit.datetime_update | moment("DD.MM.YYYY") }}</span>
                    <i class="far fa-clock ml-1 mr-50 clr-black" />
                    <span>{{ deposit.datetime_update | moment("hh:mm") }}</span>
                  </td>
                  <td>
                    <div class="d-flex justify-content-end align-items-center">
                      <button
                        v-if="deposit.status === 0"
                        v-waves
                        class="btn btn-info btn-small"
                        @click="uploadConfirmation(deposit.id, 'upload')">
                        <i class="fas fa-upload mr-50" />
                        <span>Upload Confirmation</span>
                      </button>
                      <button
                        v-if="deposit.status === 3"
                        v-waves
                        class="btn btn-info-outline btn-small"
                        @click="uploadConfirmation(deposit.id, 'update')">
                        <i class="fas fa-sync-alt mr-50" />
                        <span>Update Confirmation</span>
                      </button>

                      <a
                        :href="downloadLink(deposit.id)"
                        target="_blank"
                        v-waves
                        v-tippy
                        content="Payment Instructions"
                        class="btn btn-secondary btn-iconed btn-small ml-1">
                        <i class="fas fa-file-alt" />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td
                    :colspan="depositsColumns.length"
                    class="empty">
                    You don't have any deposits yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </app-card>

        <app-card>
          <card-overlay v-if="recentDepositsResponse" />

          <div class="d-flex align-items-center mb-2">
            <h2 class="m-0">
              <i class="fas fa-file-invoice-dollar mr-50 clr-primary opacity-85" />
              <span class="clr-dark">Deposits History</span>
            </h2>
          </div>

          <div class="table-responsive">
            <table class="table table-accented">
              <thead>
                <tr>
                  <th
                    v-for="(column, index) in invoicesColumns"
                    :key="column.title"
                    :class="index + 1 === invoicesColumns.length ? 'text-right' : ''">
                    <span>{{ column.title }}</span>
                  </th>
                </tr>
              </thead>
              <tbody v-if="invoices.length > 0">
                <tr
                  v-for="invoice in invoices"
                  :key="`invoice-${invoice.id}`">
                  <td>
                    <i class="far fa-calendar-alt mr-50 clr-black" />
                    <span>{{ invoice.datetime | moment("DD.MM.YYYY") }}</span>
                    <i class="far fa-clock ml-1 mr-50 clr-black" />
                    <span>{{ invoice.datetime | moment("hh:mm") }}</span>
                  </td>
                  <td>
                    {{ invoice.amount | commaValue }}
                  </td>
                  <td>
                    #{{ invoice.id }}
                  </td>
                  <td>
                    <i class="far fa-calendar-alt mr-50 clr-black" />
                    <span>{{ invoice.datetime_update | moment("DD.MM.YYYY") }}</span>
                  </td>
                  <td>
                    <i class="far fa-clock mr-50" />
                    <span>{{ invoice.datetime_update | moment("hh:mm") }}</span>
                  </td>
                  <td>
                    <div class="d-flex justify-content-end align-items-center">
                      <tippy
                        :ref="`tippy-${invoice.blockchain_hash}`"
                        v-if="invoice.blockchain_status"
                        interactive
                        placement="top"
                        theme="light html headed"
                        trigger="click"
                        @show="preselectInput(invoice.blockchain_hash), toggleTriggerState(invoice.blockchain_hash, true)"
                        @hide="toggleTriggerState(invoice.blockchain_hash, false)">
                        <template v-slot:trigger>
                          <button
                            :ref="`trigger-${invoice.blockchain_hash}`"
                            v-waves
                            v-tippy
                            content="Show Blockchain Hash"
                            class="btn btn-info btn-iconed btn-small mr-1">
                            <i class="fas fa-barcode-read" />
                          </button>
                        </template>
                        <div class="tippy-content">
                          <div class="tippy-header">
                            Blockchain Hash
                          </div>
                          <div class="tippy-body d-flex align-items-center">
                            <div class="input mb-0">
                              <input
                                :ref="`input-${invoice.blockchain_hash}`"
                                type="text"
                                class="input__field input__field--tiny"
                                autocomplete="off"
                                v-model="invoice.blockchain_hash" />
                            </div>
                            <button
                              v-waves
                              class="btn btn-tiny btn-info ml-50"
                              @click="copyHash(invoice.blockchain_hash)">
                              <span>Copy</span>
                              <i class="fal fa-copy ml-50" />
                            </button>
                          </div>
                        </div>
                      </tippy>
                      <a
                        :href="downloadLink(invoice.id)"
                        v-waves
                        class="btn btn-secondary btn-small">
                        <i class="fas fa-download mr-50" />
                        <span>Download Invoice</span>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td
                    :colspan="invoicesColumns.length"
                    class="empty">
                    You don't have any invoices yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            v-if="invoicesLength.next && invoicesLength.next > 0"
            :disabled="invoicesResponse"
            class="btn btn-primary btn-small btn-center"
            @click="getInvoices({ startFrom: invoicesLength.next })">
            <span
              v-if="!invoicesResponse"
              class="mr-50 d-none d-sm-block">
              Load More
            </span>
            <span
              v-else
              class="btn__loading">
              Please Wait
            </span>
            <i
              v-if="!invoicesResponse"
              class="fas fa-chevron-circle-down" />
          </button>
        </app-card>
      </div>
    </div>

    <app-preloader :show="recentDepositsResponse || invoicesResponse" />
  </div>
</template>

<script>
import { eventBus } from '../../main'

export default {
  name: 'DepositList',
  data() {
    return {
      depositsColumns: [
        {
          title: 'Date',
        },
        {
          title: 'Amount',
        },
        {
          title: 'Transaction ID',
        },
        {
          title: 'Status',
        },
        {
          title: 'Last Update',
        },
        {
          title: 'Actions',
        },
      ],

      invoicesColumns: [
        {
          title: 'Date',
        },
        {
          title: 'Amount',
        },
        {
          title: 'Transaction ID',
        },
        {
          title: 'Completion Date',
        },
        {
          title: 'Completion Time',
        },
        {
          title: 'Actions',
        },
      ],
    }
  },
  filters: {
    commaValue(value) {
      const testVal = value !== undefined && value !== null && typeof value === 'number'

      if (testVal) {
        const whole = Math.floor(value).toString()
        const decimal = (value % 1).toFixed(2).toString().split('.')[1]
        const newstr = []
        for (let i = whole.length; i > 0; i -= 3) {
          newstr.unshift(whole.substring(i, i - 3))
        }
        return `$${newstr.join(',')}.${decimal}`
      } else {
        return '$0.00'
      }
    },
  },
  computed: {
    recentDeposits() {
      return this.$store.state.deposit.recentDeposits
    },

    invoices() {
      return this.$store.state.deposit.invoices
    },

    invoicesLength() {
      return this.$store.state.deposit.invoicesLength
    },

    recentDepositsResponse() {
      return this.$store.state.deposit.responses.recentDeposits
    },

    invoicesResponse() {
      return this.$store.state.deposit.responses.invoices
    },

    user() {
      return this.$store.state.auth.user
    },
  },
  mounted() {
    eventBus.$on('showToast/DepositList', data => { this.showToast(data) })

    this.getRecentDeposits()
    this.getInvoices({ startFrom: 0 })
  },
  beforeDestroy() {
    eventBus.$off('showToast/DepositList')

    this.clearDeposits()
  },
  methods: {
    getRecentDeposits() {
      this.$store.dispatch('deposit/getRecentDeposits')
    },

    getInvoices({ startFrom }) {
      this.$store.dispatch('deposit/getInvoices', { startFrom: startFrom })
    },

    badgeType(type) {
      // -10 => 'declined'
      // 0   => 'pending'
      // 3   => 'confirmed'
      // 5   => 'processing'
      // 10  => 'completed'

      if (type === -10) { return 'danger' }
      else if (type === 0) { return 'secondary' }
      else if (type === 3) { return 'info' }
      else if (type === 5) { return 'warning' }
      else if (type === 10) { return 'success' }
      else { return 'secondary' }
    },

    downloadLink(id) {
      return `/payments/invoice-opc.php?transaction_id=${id}`
    },

    uploadConfirmation(id, title) {
      this.$store.dispatch('deposit/sendToConfirmation', {
        id: id,
        title: title,
      })
    },

    clearDeposits() {
      this.$store.dispatch('deposit/clearDeposits')
    },

    copyHash(ref) {
      this.$nextTick(() => {
        this.$refs[`input-${ref}`][0].select()
        this.$refs[`tippy-${ref}`][0].tip.hide()
        document.execCommand('copy')
        this.showToast({
          message: 'Copied to clipboard!',
          type: 'success',
        })
      })
    },

    toggleTriggerState(ref, state) {
      this.$refs[`trigger-${ref}`][0].disabled = state
    },

    preselectInput(ref) {
      this.$nextTick(() => {
        this.$refs[`input-${ref}`][0].select()
      })
    },

    showToast(data) {
      this.$toast(data.message, {
        type: data.type
      })
    }
  }
}
</script>
