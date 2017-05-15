<template>
  <div>
    <div class="header">
      <div class="header-wraper">
        <div class="logo">
          <router-link :to="{path: '/'}">
            <img src="../assets/images/logo.png" alt="logo">
          </router-link>
        </div>
        <div class="nav">
          <ul>
            <li class="nav-item">
              <router-link :to="{path: '/'}">
                <img src="../assets/images/home.png" alt="home icon">
                <span>首页</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{path: '/goods/list'}">
                <img src="../assets/images/order.png" alt="order icon">
                <span>订购蛋糕</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{path: '/dakehu/index'}">
                <img src="../assets/images/vip_area.png" alt="vip_area icon">
                <span>企业专区</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{path: '/site/about-mes'}">
                <img src="../assets/images/about.png" alt="about icon">
                <span>关于每实</span>
              </router-link>
            </li>
            <li class="nav-item login-item" @mouseenter="openLoginWraper" @mouseleave="closeLoginWraper">
                <img src="../assets/images/vip.png" alt="vip icon">
                <span v-if="!islogined">会员登录</span><span v-if="islogined">{{username}}</span>
                <img src="../assets/images/drop_down.png" alt="drop icon" class="dropicon">
                <div class="login-wraper" v-show="isShowLoginWraper">
                  <div class="hasLoginedWraper" v-if="islogined">
                    <div class="hasLoginedbtn">个人中心</div>
                    <div class="hasLoginedbtn">我的订单</div>
                    <div class="hasLoginedbtn" @click="loginOut">退出</div>
                  </div>
                  <div class="login-box" v-if="!islogined">
                    <div class="login" @click="onLoginDialog"><p>立即登录</p></div>
                    <div class="register" @click="onResgisterDialog"><p>注册账号</p></div>
                  </div>
                  <div class="shoppingcart">
                    <router-link to="/cart">
                      <div class="cart">
                        <img src="../assets/images/shopping_cart.png"><span>{{cartCount}}</span>
                      </div>
                    </router-link>
                    <p>空空如也~快去选购吧</p>
                  </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
      <div></div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-footer :advertisement="ad" @open-login="onLoginDialog"></my-footer>
    <div class="dialogBox">
      <my-dialog v-show="isShowLoginDialog" @on-close="closeDialog('isShowLoginDialog')">
        <login-form></login-form>
      </my-dialog>
      <my-dialog v-show="isShowResgDialog" @on-close="closeDialog('isShowResgDialog')">
        <resgister-form></resgister-form>
      </my-dialog>
      <my-dialog v-show="isShowCartInfo" @on-close="closeDialog('isShowCartInfo')">
        <cart-info></cart-info>
      </my-dialog>
    </div>
  </div>
</template>

<script>
import { eventHub } from '../eventHub'
import myFooter from './footer'
import Dialog from './dialog'
import loginForm from './loginForm'
import resgisterForm from './resgisterForm'
import cartInfo from './cartInfo'

const ERR_OK = 0

export default {
  data () {
    return {
      isShowLoginWraper: false,
      isShowLoginDialog: false,
      isShowResgDialog: false,
      isShowCartInfo: false,
      ad: []
    }
  },
  computed: {
    username () {
      if (this.$store.getters.getLoginstatus === true) {
        let userString = String(this.$store.getters.getUsername)
        return userString.replace(/^\d{7}/g, '***')
      }
      return ''
    },
    islogined () {
      return this.$store.getters.getLoginstatus
    },
    cartCount () {
      return this.$store.getters.getcartGoods.length
    }
  },
  methods: {
    // toggleShow () {
    //   this.isShowLoginWraper = !this.isShowLoginWraper
    // },
    // 作为绑定在login-box上的mouseenter,mouseleave事件处理函数上时会与其上的click处理函数冲突，反复触发mouseenter，mouseleave事件;遮罩层不会立即挡住鼠标所在位置标签触发mouseleave事件
    openLoginWraper () {
      this.isShowLoginWraper = true
    },
    closeLoginWraper () {
      this.isShowLoginWraper = false
    },
    onLoginDialog () {
      this.isShowLoginWraper = false
      this.isShowResgDialog = false
      this.isShowLoginDialog = true
    },
    onResgisterDialog () {
      this.isShowLoginWraper = false
      this.isShowLoginDialog = false
      this.isShowResgDialog = true
    },
    closeDialog (arg) {
      this[arg] = false
    },
    loginOut () {
      this.$store.commit('updateloginstatus', false)
    }
  },
  created () {
    this.$http.get('/api/ad').then((response) => {
      let res = response.body
      if (res.errno === ERR_OK) {
        this.ad = res.data
      }
    })
    this.$store.dispatch('fetchGoods')
  },
  components: {
    myFooter,
    myDialog: Dialog,
    loginForm,
    resgisterForm,
    cartInfo
  },
  mounted () {
    eventHub.$on('on-resgister', () => {
      this.isShowLoginDialog = false
      this.isShowResgDialog = true
    })
    eventHub.$on('on-login', () => {
      this.isShowResgDialog = false
      this.isShowLoginDialog = true
    })
    eventHub.$on('has-login', () => {
      this.isShowLoginDialog = false
    })
    eventHub.$on('on-cartInfo', () => {
      this.isShowCartInfo = true
    })
    eventHub.$on('on-closeCartInfo', () => {
      this.isShowCartInfo = false
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/css/normalize.css'

  .header
    background: #090909
    height: 90px
    .header-wraper
      display: flex
      justify-content: space-between
      max-width: 1200px
      margin: 0 auto
      height: 100%
      background: #090909
      .logo
      .nav
        display: flex
        align-items: flex-end
        color: #c9c9c9
        .login-item
          width: 130px
          height: 42px
        .nav-item
          display: inline-block
          position: relative
          text-align: center
          width: 130px
          height: 42px
          font-size:14px
          line-height: 42px
          cursor: pointer
          &:hover
            background: #dd0330
          a
            display: block
          img
            vertical-align:text-bottom
          span
            color: #c9c9c9
          .dropicon
            position: relative
            top: -3px
            left: 4px
          .login-wraper
            position: absolute
            top: 42px
            right: 0
            width: 130px
            background: #FFF
            z-index: 50
            .login-box
              border-bottom: 1px solid #EEE
              width: 130px
              height: 95px
              .login,.register
                width: 100px
                height: 35px
                margin: 10px auto
                line-height: 35px
              .login
                color: #FFF
                background: #dd0330
                cursor : pointer
              .register
                color: #0b0b0b
                background: #eef0f1
                cursor : pointer
            .hasLoginedWraper
              .hasLoginedbtn
                &:hover
                  color: #FFF
                  background: #dd0330
              text-align
            .shoppingcart
              font-size: 12px
              .cart
                width: 100px
                margin: auto
                display: flex
                align-items: center
                span
                  display: inline-block
                  width: 30px
                  height: 18px
                  line-height: 18px
                  margin-left: 2px
                  color: #FFF
                  background: #dd0330
                  border-radius: 5px
              p
                line-height: 25px
  .dialogBox
    position: relative
    z-index: 10

</style>
