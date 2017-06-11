import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    codeChangeLoading: false,
    count: 0,
    username: '',
    api: 'http://control.meihua.info:9999'
  },
  mutations: {
    setCodeLoad (state, payload) {
      state.codeChangeLoading = payload.isOn
    }
  },
  getters: {
    dobule: (state) => {
      state.count * 2
    }
  }
})