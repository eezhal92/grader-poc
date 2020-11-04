import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const openings = [
  {
    id: 33,
    role: 'Ruby on Rails Engineer',
    difficulty: 'hard',
  },
  {
    id: 1,
    role: 'Frontend Engineer',
    difficulty: 'easy',
  },
  {
    id: 2,
    role: 'Backend Engineer',
    difficulty: 'medium',
  },
  {
    id: 3,
    role: 'Machine Learning Engineer',
    difficulty: 'hard',
  },
  {
    id: 4,
    role: 'NLP Engineer',
    difficulty: 'hard',
  },
];

export default new Vuex.Store({
  state: {
    openings,
    session: {
      username: 'alex',
      runtime: 'nodejs',
      testId: 'royalrumble',
    },
  },
  getters: {
    session: state => state.session,
    openings: state => state.openings,
  },
  mutations: {
    SET_SESSION (state, session) {
      state.session = session;
    },
  },
})
