import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: {
      username: 'alex',
      runtime: 'nodejs',
      testId: 'royalrumble',
    },
  },
  getters: {
    session: state => state.session,
  },
  mutations: {
    SET_SESSION (state, session) {
      state.session = session;
    },
  },
})
