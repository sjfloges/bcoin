import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { eventBus } from '../../main'

axios.defaults.withCredentials = true

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    settings: {
      account: {},
      billing: {},
      company: {},
      member: {},
      payments: {},
    },

    responses: {
      getSettings: false,
    }
  },
  mutations: {
    SAVE_SETTINGS(state, data) {
      state.settings = data
    },

    SAVE_RESPONSE_STATE(state, { type, currState }) {
      state.responses[type] = currState
    },
  },
  actions: {
    getSettings({ commit }) {
      commit('SAVE_RESPONSE_STATE', {
        type: 'getSettings',
        currState: true,
      })

      axios
        .get(`${process.env.VUE_APP_PROFILE_SETTINGS}`)

        .then(res => {
          const data = res.data

          if (data.errors.length === 0) {
            commit('SAVE_SETTINGS', data.data)
          } else {
            for (let i = 0; i < data.errors.length; i++) {
              eventBus.$emit('showToast', {
                message: data.errors[i],
                type: 'error',
              })
            }
          }

          commit('SAVE_RESPONSE_STATE', {
            type: 'getSettings',
            currState: false,
          })
        })

        .catch(err => {
          console.error(err)

          commit('SAVE_RESPONSE_STATE', {
            type: 'getSettings',
            currState: false,
          })

          eventBus.$emit('showToast', {
            message: 'Oops! Something went wrong',
            type: 'error',
          })
        })
    },
  },
}
