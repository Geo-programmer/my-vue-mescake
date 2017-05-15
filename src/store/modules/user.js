
const state = {
  hasLogin: false,
  username: ''
}

const getters = {
  getLoginstatus: (state) => {
    return state.hasLogin
  },
  getUsername: (state) => {
    return state.username
  }
}

const actions = {
}

const mutations = {
  updateloginstatus (state, status) {
    state.hasLogin = status
  },
  updateUsername (state, name) {
    if (name) {
      state.username = name
      window.localStorage.setItem('username', JSON.stringify(name))
    } else {
      state.username = JSON.parse(window.localStorage.getItem('username'))
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
