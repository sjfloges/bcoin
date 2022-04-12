import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../../router'
import { eventBus } from '../../main'

Vue.use(Vuex)

axios.defaults.withCredentials = true

let callNewTransfer

export default {
  namespaced: true,
  state: {
    transfers: {
      outgoing: {
        records: [],
        stats: {
          total: undefined,
          next: 0,
        }
      },

      incoming: {
        records: [],
        stats: {
          total: undefined,
          next: 0,
        }
      },
    },

    newTransfer: {
      id: undefined,
      company: '',
      fullname: '',
      amount: 0,
      reference: '',
    },

    uploadData: {},

    responses: {
      outgoingTransfer: false,
      incomingTransfer: false,
      newTransfer: false,
    }
  },
  mutations: {
    SAVE_TRANSFERS(state, { type, data }) {
      for (let i = 0; i < data.length; i++) {
        state.transfers[type].records.push(data[i])
      }
    },

    CLEAR_TRANSFERS(state, type) {
      state.transfers[type].records = []
    },

    SAVE_TRANSFERS_STATS(state, { type, total, next }) {
      state.transfers[type].stats.total = total
      state.transfers[type].stats.next = next
    },

    SAVE_NEW_TRANSFER(state, data) {
      Object.keys(data).forEach(key => {
        state.newTransfer[key] = data[key]
      })
    },

    SAVE_UPLOAD_DATA(state, data) {
      state.uploadData = data.transaction
      state.uploadData.balance = data.balance
    },

    CLEAR_UPLOAD_DATA(state) {
      state.uploadData = {}
    },

    SAVE_RESPONSE_STATE(state, { type, currState }) {
      state.responses[`${type}Transfer`] = currState
    },
  },
  actions: {
    getTransfers({ commit }, { type, startFrom }) {
      commit('SAVE_RESPONSE_STATE', {
        type: type,
        currState: true,
      })

      const apiLinks = {
        outgoing: process.env.VUE_APP_OUTGOING_TRANSFERS,
        incoming: process.env.VUE_APP_INCOMING_TRANSFERS,
      }

      axios
        .get(`${apiLinks[type]}?start=${startFrom}`)

        .then(res => {
          const data = res.data

          if (data.errors.length === 0) {
            commit('SAVE_TRANSFERS', {
              type: type,
              data: data.records
            })
            commit('SAVE_TRANSFERS_STATS', {
              type: type,
              total: data.totals,
              next: data.next
            })
          } else {
            for (let i = 0; i < data.errors.length; i++) {
              eventBus.$emit('showToast/TransferList', {
                message: data.errors[i],
                type: 'error',
              })
            }
          }

          commit('SAVE_RESPONSE_STATE', {
            type: type,
            currState: false,
          })
        })

        .catch(err => {
          console.error(err)

          eventBus.$emit('showToast/TransferList', {
            message: 'Oops! Something went wrong',
            type: 'error',
          })

          commit('SAVE_RESPONSE_STATE', {
            type: type,
            currState: false,
          })
        })
    },

    newTransfer({ commit }, params) {
      if (callNewTransfer) {
        callNewTransfer.cancel()
      }
      callNewTransfer = axios.CancelToken.source()

      commit('SAVE_RESPONSE_STATE', {
        type: 'new',
        currState: true,
      })

      axios
        .post(
          process.env.VUE_APP_NEW_TRANSFER,
          params,
          {
            headers: {},
            cancelToken: callNewTransfer.token,
          },
        )

        .then(res => {
          const data = res.data

          if (data.errors.length === 0) {
            commit('SAVE_UPLOAD_DATA', data)
            commit('auth/UPDATE_BALANCE',
              {
                type: 'balance',
                data: data.balance
              },
              { root: true }
            )

            router.push({ name: 'TransferSuccess' }).catch(err => {
              console.error(err)
            })
          } else {
            for (let i = 0; i < data.errors.length; i++) {
              eventBus.$emit('showToast/TransferConfirm', {
                message: data.errors[i],
                type: 'error',
              })
            }
          }

          commit('SAVE_RESPONSE_STATE', {
            type: 'new',
            currState: false,
          })
        })

        .catch(err => {
          console.error(err)

          if (!axios.isCancel(err)) {
            eventBus.$emit('showToast/TransferConfirm', {
              message: 'Oops! Something went wrong',
              type: 'error',
            })
            commit('SAVE_RESPONSE_STATE', {
              type: 'new',
              currState: false,
            })
          } else {
            commit('SAVE_RESPONSE_STATE', {
              type: 'new',
              currState: true,
            })
          }
        })
    },

    clearTransfers({ commit }, type) {
      commit('CLEAR_TRANSFERS', type)
      commit('SAVE_TRANSFERS_STATS', {
        type: type,
        total: undefined,
        next: 0
      })
    }
  },
}
