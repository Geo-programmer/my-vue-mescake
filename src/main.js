// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import Layout from './components/layout'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueScrollto from 'vue-scrollto'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(VueScrollto)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})
