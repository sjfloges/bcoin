<template>
  <div class="container">
    <div class="row">
      <div class="col col-12">

        <app-card>
          <card-overlay v-if="outgoingTransfersResponse && outgoingTransfersStats.next === 0" />

          <div class="d-flex align-items-start align-items-sm-center mb-2">
            <h2 class="m-0 pr-1">
              <i class="fas fa-inbox-out mr-75 clr-primary opacity-85" />
              <span class="clr-dark">Outgoing Settlement History</span>
            </h2>
            <router-link
              v-if="user.payments"
              :to="{ name: 'TransferBeneficiary'}"
              tag="button"
              v-waves
              class="btn btn-primary btn-medium ml-auto">
              <i class="fas fa-plus" />
              <span class="ml-75 d-none d-sm-block">Make a New Transfer</span>
            </router-link>
            <div
              v-else
              class="d-flex align-items-center ml-auto">
              <button
                disabled
                class="btn btn-medium">
                <i class="fas fa-plus" />
                <span class="ml-75 d-none d-sm-block">Make a New Transfer</span>
              </button>
              <i
                v-tippy="{ placement: 'left', interactive: true }"
                content="You don't have rights to make a new transfer. Please provide <span class='font-weight-500'>billing information</span> in <a href='../settings'>account settings</a>."
                class="far fa-question-circle fa-lg clr-info ml-50" />
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-accented">
              <thead>
                <tr>
                  <th
                    v-for="(column, index) in outgoingTransfersColumns"
                    :key="column.title"
                    :class="index + 1 === outgoingTransfersColumns.length ? 'text-right' : ''">
                    <span>{{ column.title }}</span>
                  </th>
                </tr>
              </thead>
              <tbody v-if="outgoingTransfers.length > 0">
                <tr
                  v-for="transfer in outgoingTransfers"
                  :key="transfer.id">
                  <td>
                    <i class="far fa-calendar-alt mr-50 clr-black" />
                    <span>{{ transfer.datetime | moment("DD.MM.YYYY") }}</span>
                    <i class="far fa-clock ml-1 mr-50 clr-black" />
                    <span>{{ transfer.datetime | moment("hh:mm") }}</span>
                  </td>
                  <td>
                    <span
                      v-tippy
                      :content="transfer.company"
                      class="text-truncate"
                      style="max-width: 250px; cursor: help;">
                      {{ transfer.company }}
                    </span>
                  </td>
                  <td>
                    {{ transfer.amount | commaValue }}
                  </td>
                  <td>
                    #{{ transfer.id }}
                  </td>
                  <td class="text-capitalize">
                    <app-badge
                      :text="transfer.status_label"
                      :type="badgeType(transfer.status)" />
                  </td>
                  <td class="text-capitalize">
                    <i class="far fa-calendar-alt mr-50 clr-black" />
                    <span>{{ transfer.datetime_update | moment("DD.MM.YYYY") }}</span>
                    <i class="far fa-clock ml-1 mr-50 clr-black" />
                    <span>{{ transfer.datetime_update | moment("hh:mm") }}</span>
                  </td>
                  <td>
                    <div class="d-flex justify-content-end align-items-center">
                      <tippy
                        :ref="`tippy-${transfer.blockchain_hash}`"
                        v-if="transfer.blockchain_status"
                        interactive
                        placement="top"
                        theme="light html headed"
                        trigger="click"
                        @show="preselectInput(transfer.blockchain_hash), toggleTriggerState(transfer.blockchain_hash, true)"
                        @hide="toggleTriggerState(transfer.blockchain_hash, false)">
                        <template v-slot:trigger>
                          <button
                            :ref="`trigger-${transfer.blockchain_hash}`"
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
                                :ref="`input-${transfer.blockchain_hash}`"
                                type="text"
                                class="input__field input__field--tiny"
                                autocomplete="off"
                                v-model="transfer.blockchain_hash" />
                            </div>
                            <button
                              v-waves
                              class="btn btn-tiny btn-info ml-50"
                              @click="copyHash(transfer.blockchain_hash)">
                              <span>Copy</span>
                              <i class="fal fa-copy ml-50" />
                            </button>
                          </div>
                        </div>
                      </tippy>
                      <a
                        v-if="transfer.status >= 5"
                        :href="downloadLink(transfer.id, 'opc')"
                        target="_blank"
                        v-waves
                        v-tippy
                        content="Outgoing Settlement Confirmation"
                        class="btn btn-secondary btn-iconed btn-small">
                        <i class="fas fa-file-export" />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td
                    :colspan="outgoingTransfersColumns.length"
                    class="empty">
                    You don't have Outgoing Settlement History
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            v-if="outgoingTransfersStats.next && outgoingTransfersStats.next > 0"
            :disabled="outgoingTransfersResponse"
            class="btn btn-primary btn-small btn-center"
            @click="getTransfers({ type: 'outgoing', startFrom: outgoingTransfersStats.next })">
            <span
              v-if="!outgoingTransfersResponse"
              class="mr-50 d-none d-sm-block">
              Load More
            </span>
            <span
              v-else
              class="btn__loading">
              Please Wait
            </span>
            <i
              v-if="!outgoingTransfersResponse"
              class="fas fa-chevron-circle-down" />
          </button>
        </app-card>

        <app-card>
          <card-overlay v-if="incomingTransfersResponse && incomingTransfersStats.next === 0" />

          <div class="d-flex align-items-center mb-2">
            <h2 class="m-0">
              <i class="fas fa-inbox-in mr-75 clr-primary opacity-85" />
              <span class="clr-dark">Incoming Settlement Requests</span>
            </h2>
          </div>

          <div class="table-responsive">
            <table class="table table-accented">
              <thead>
                <tr>
                  <th
                    v-for="(column, index) in incomingTransfersColumns"
                    :key="column.title"
                    :class="index + 1 === incomingTransfersColumns.length ? 'text-right' : ''">
                    <span>{{ column.title }}</span>
                  </th>
                </tr>
              </thead>
              <tbody v-if="incomingTransfers.length > 0">
                <tr
                  v-for="transfer in incomingTransfers"
                  :key="transfer.id">
                  <td>
                    <i class="far fa-calendar-alt mr-50 clr-black" />
                    <span>{{ transfer.datetime | moment("DD.MM.YYYY") }}</span>
                    <i class="far fa-clock ml-1 mr-50 clr-black" />
                    <span>{{ transfer.datetime | moment("hh:mm") }}</span>
                  </td>
                  <td>
                    <span
                      v-tippy
                      :content="transfer.company"
                      class="text-truncate"
                      style="max-width: 200px; cursor: help;">
                      {{ transfer.company }}
                    </span>
                  </td>
                  <td>
                    {{ transfer.amount | commaValue }}
                  </td>
                  <td>
                    {{ beautifiedFee(transfer.request_fee_by) }}
                  </td>
                  <td>
                    #{{ transfer.id }}
                  </td>
                  <td class="text-capitalize">
                    <div class="d-flex align-items-center">
                      <app-badge
                        :text="transfer.status_label"
                        :type="badgeType(transfer.status)" />
                      <i
                        v-if="transfer.status === -10 && transfer.decline_reason"
                        v-tippy
                        :content="transfer.decline_reason"
                        class="fas fa-question-circle ml-50 clr-info" />
                    </div>
                  </td>
                  <td class="text-capitalize">
                    <i class="far fa-calendar-alt mr-50 clr-black" />
                    <span>{{ transfer.datetime_update | moment("DD.MM.YYYY") }}</span>
                    <i class="far fa-clock ml-1 mr-50 clr-black" />
                    <span>{{ transfer.datetime_update | moment("hh:mm") }}</span>
                  </td>
                  <td>
                    <div class="d-flex justify-content-end align-items-center">
                      <button
                        v-waves
                        v-tippy
                        content="Accept and Pay"
                        class="btn btn-success btn-small mr-1">
                        <i class="fas fa-check mr-50" />
                        <span>Accept</span>
                      </button>
                      <button
                        v-waves
                        v-tippy
                        content="Decline"
                        class="btn btn-danger btn-iconed btn-small">
                        <i class="fas fa-ban" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td
                    :colspan="incomingTransfersColumns.length"
                    class="empty">
                    You don't have any Incoming Settlement Requests
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            v-if="incomingTransfersStats.next && incomingTransfersStats.next > 0"
            :disabled="incomingTransfersResponse"
            class="btn btn-primary btn-small btn-center"
            @click="getTransfers({ type: 'incoming', startFrom: incomingTransfersStats.next })">
            <span
              v-if="!incomingTransfersResponse"
              class="mr-50 d-none d-sm-block">
              Load More
            </span>
            <span
              v-else
              class="btn__loading">
              Please Wait
            </span>
            <i
              v-if="!incomingTransfersResponse"
              class="fas fa-chevron-circle-down" />
          </button>
        </app-card>
      </div>
    </div>

    <app-preloader :show="outgoingTransfersResponse || incomingTransfersResponse" />
  </div>
</template>

<script>
import { eventBus } from '../../main'

export default {
  name: 'TransferList',
  data() {
    return {
      outgoingTransfersColumns: [
        {
          title: 'Date',
        },
        {
          title: 'Recipient'
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

      incomingTransfersColumns: [
        {
          title: 'Date',
        },
        {
          title: 'Sender'
        },
        {
          title: 'Amount',
        },
        {
          title: 'Fee',
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
    outgoingTransfersResponse() {
      return this.$store.state.transfer.responses.outgoingTransfer
    },

    incomingTransfersResponse() {
      return this.$store.state.transfer.responses.incomingTransfer
    },

    outgoingTransfers() {
      return this.$store.state.transfer.transfers.outgoing.records
    },

    incomingTransfers() {
      return this.$store.state.transfer.transfers.incoming.records
    },

    outgoingTransfersStats() {
      return this.$store.state.transfer.transfers.outgoing.stats
    },

    incomingTransfersStats() {
      return this.$store.state.transfer.transfers.incoming.stats
    },

    user() {
      return this.$store.state.auth.user
    },
  },
  mounted() {
    eventBus.$on('showToast/TransferList', data => { this.showToast(data) })

    this.getTransfers({
      type: 'outgoing',
      startFrom: 0
    })

    this.getTransfers({
      type: 'incoming',
      startFrom: 0
    })
  },
  beforeDestroy() {
    eventBus.$off('showToast/TransferList')

    this.clearTransfers()
  },
  methods: {
    showToast(data) {
      this.$toast(data.message, {
        type: data.type
      })
    },

    badgeType(type) {
      // -10 => 'declined'
      // 0   => 'pending'
      // 3   => 'confirmed'
      // 5   => 'sent'
      // 10  => 'completed'

      if (type === -10) { return 'danger' }
      else if (type === 0) { return 'secondary' }
      else if (type === 3) { return 'info' }
      else if (type === 5) { return 'warning' }
      else if (type === 10) { return 'success' }
      else { return 'secondary' }
    },

    downloadLink(id, type) {
      return `/payments/invoice-${type}.php?transaction_id=${id}`
    },

    beautifiedFee(fee) {
      const variants = {
        0: 'Paid by payee',
        1: '50% / 50%',
        2: 'Paid by payer',
      }

      return fee ? variants[fee] : variants[2]
    },

    getTransfers({ type, startFrom }) {
      this.$store.dispatch('transfer/getTransfers', {
        type: type,
        startFrom: startFrom
      })
    },

    clearTransfers() {
      this.$store.dispatch('transfer/clearTransfers', 'outgoing')
      this.$store.dispatch('transfer/clearTransfers', 'incoming')
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
  }
}
</script>
