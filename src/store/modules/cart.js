
const state = {
  cartGoods: [],
  tableware: {}
}

const getters = {
  getcartGoods: (state) => {
    return state.cartGoods
  },
  gettableware: (state) => {
    return state.tableware
  }
}

const actions = {
}

const mutations = {
  updatecartGoods (state, good) {
    state.cartGoods.push(good)
  },
  deleteFromGoods (state, index) {
    state.cartGoods.splice(index, 1)
  },
  updateGoodCount (state, args) {
    state.cartGoods[args.index].count = args.val
  },
  updatetableware (state, ware) {
    state.tableware = ware
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
