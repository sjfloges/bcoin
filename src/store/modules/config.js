import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    menuOpened: false,
    userMenuOpened: false,
  },
  mutations: {
    TOGGLE_MENU(state, value) {
      state.menuOpened = value
    },

    TOGGLE_USER_MENU(state, value) {
      state.userMenuOpened = value
    }
  },
  actions: {

  },
}
