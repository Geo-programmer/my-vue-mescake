import Vue from 'vue'

const ERR_OK = 0

const state = {
  goods: [],
  selectedGood: {}
}

const getters = {
  getGoods: (state) => {
    return state.goods
  },
  getSelectedGood: (state) => {
    return state.selectedGood
  }
}

const actions = {
  fetchGoods ({commit, state}) {
    Vue.http.get('/api/goods').then((response) => {
      let res = response.body
      if (res.errno === ERR_OK) {
        commit('updateGoods', res.data)
      }
    })
  }
}

const mutations = {
  updateGoods (state, goods) {
    state.goods = goods
  },
  // 将selectedGood 存入localStorage中，刷新detailPage时从locaStorage中取出，以保持detailPage页面状态
  updateSelectedGood (state, good) {
    if (good) {
      state.selectedGood = good
      window.localStorage.setItem('selectedGood', JSON.stringify(good))
    } else {
      state.selectedGood = JSON.parse(window.localStorage.getItem('selectedGood'))
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

