import Vuex from 'vuex'
import Vue from 'vue'
import goods from './modules/goods'
import user from './modules/user'
import cart from './modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    goods,
    user,
    cart
  }
})
