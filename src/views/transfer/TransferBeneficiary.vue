<template>
  <div class="container">
    <div class="row">
      <div class="mb-1 col col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12">
        <app-wizard
          :steps="transferSteps"
          :currentStep="1" />
      </div>
      <div class="col col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12">
        <app-card>
          <form
            @submit="goNext($event)"
            novalidate="true"
            class="d-flex flex-column">
            <div class="position-relative">
              <router-link
                :to="{ name: 'Transfer'}"
                tag="a"
                v-waves
                class="position-absolute btn btn-iconed btn-small btn-secondary-flat"
                content="Go Back"
                v-tippy>
                <i class="fas fa-chevron-left" />
              </router-link>
              <h3 class="clr-primary text-center">
                Recepient
              </h3>
            </div>
            <p class="text-center mb-3">Who do you want to transfer?</p>
            <member-search
              ref="memberSearch"
              :required="true" />
            <div class="input">
              <label
                for="reference"
                class="input__label d-flex align-items-center flex-wrap">
                <span>Notes</span>
              </label>
              <textarea
                name="reference"
                ref="reference"
                id="reference"
                rows="3"
                maxlength="160"
                data-type="textarea"
                class="input__field"
                placeholder="Type some notes here..."
                v-model="userData.reference" />
            </div>
            <button
              type="submit"
              v-waves
              class="btn btn-medium btn-primary btn-block">
              Continue
            </button>
          </form>
        </app-card>
      </div>
    </div>
  </div>
</template>

<script>
import { transferSteps } from '@/router/wizard'
import { eventBus } from '../../main'

export default {
  name: 'TransferBeneficiary',
  data() {
    return {
      userData: {
        reference: '',
      },

      transferSteps: [],
    }
  },
  computed: {

  },
  created() {
    this.transferSteps = transferSteps
  },
  mounted() {
    eventBus.$on('showToast/TransferBeneficiary', data => { this.showToast(data) })
  },
  beforeDestroy() {
    eventBus.$off('showToast/TransferBeneficiary')
  },
  methods: {
    goNext(event) {
      event.preventDefault()

      this.$refs.memberSearch.validateForm().then(result => {
        if (result.status) {
          this.$store.commit('transfer/SAVE_NEW_TRANSFER', {
            id: result.data.id,
            company: result.data.company,
            fullname: result.data.fullname,
            reference: this.userData.reference,
          })

          this.$router.push({ name: 'TransferAmount' }).catch(err => {
            console.error(err)
          })
        }
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
