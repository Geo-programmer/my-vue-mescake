import Vue from 'vue'
import Router from 'vue-router'
import frontPage from '../pages/frontPage'
import listPage from '../pages/listpage'
import detailPage from '../pages/detailPage'
import dakehuPage from '../pages/dakehuPage'
import aboutPage from '../pages/aboutPage'
import cartPage from '../pages/cartPage'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

export default new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      component: frontPage
    },
    {
      path: '/goods/list',
      component: listPage
    },
    {
      name: 'detailPage',
      path: '/goods/detail/:id',
      component: detailPage,
      meta: {scrollToTop: true}
    },
    {
      path: '/dakehu/index',
      component: dakehuPage
    },
    {
      path: '/site/about-mes',
      component: aboutPage
    },
    {
      path: '/cart',
      component: cartPage
    }
  ]
})
