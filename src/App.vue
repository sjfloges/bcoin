<template>
  <div id="app">
    <app-layout v-if="!checkLoginResponse">
      <router-view />
    </app-layout>
    <app-preloader :show="checkLoginResponse" />
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue"
import { eventBus } from './main'
import axios from 'axios'

export default {
  components: { AppLayout },
  name: 'Home',
  data() {
    return {

    }
  },
  computed: {
    checkLoginResponse() {
      return this.$store.state.auth.responses.checkLogin
    }
  },
  created() {
    this.checkLogin()
    this.getSettings()
  },
  mounted() {
    eventBus.$on('showToast', data => { this.showToast(data) })
    this.watchErrors()
  },
  methods: {
    showToast(data) {
      this.$toast(data.message, {
        type: data.type,
      })
    },

    checkLogin() {
      this.$store.dispatch('auth/checkLogin')
    },

    getSettings() {
      this.$store.dispatch('user/getSettings')
    },

    watchErrors() {
     const self = this

      axios.interceptors.response.use(function (response) {
        if (process.env.VUE_APP_ENV === 'development' || process.env.VUE_APP_ENV === 'staging') {
          console.info({
            routeName: self.$route.name,
            requestUrl: `${response.config.baseURL}${response.config.url}`,
            response: response.data,
          })
        }
        /*
          THIS IS TEMPORARY HACK!
          ASK ALEXANDRU RAILEANU
        */
        if (response.data.mobileauth) {
          self.$store.dispatch('auth/logOut', null, { root: true })
        }
        return response
      }, function (error) {
        console.error(error)
        return Promise.reject(error)
      })
    }
  },
}
</script>

<style lang="scss">
  @import "styles/main";
</style>
