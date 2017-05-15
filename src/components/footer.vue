<template>
  <div class="footer">
    <div class="footer-up">
      <div class="footer-wraper">
        <div class="footer-ad">
          <ul>
            <li v-for="(item, index) in advertisement" @mouseenter="showIcon(index)" @mouseleave="unShowIcon(index)">
              <div class="ad-pic">
                <img :src="item.imgSrc">
              </div>
              <transition name="fade">
                <div class="ad-title" v-show="untouch[index]">{{item.name}}</div>
              </transition>
              <transition name="cover">
                <div class="icon-cover" v-show="touched[index]"></div>
              </transition>
              <transition name="showup">
                <div class="ad-icon" v-show="touched[index]">
                  <div class="icon-pic">
                    <img :src="item.iconSrc">
                  </div>
                  <div class="icon-text">{{item.name}}</div>
                </div>
              </transition>
            </li>
          </ul>
        </div>
        <div class="footer-logo"><img src="../assets/images/logo.png" alt="logo">
        </div>
        <div class="footer-nav">
          <ul>
            <li>
              <router-link :to="{path: '/'}"><span>首页</span></router-link>
            </li>
            <li>
              <router-link :to="{path: '/goods/list'}"><span>订购蛋糕</span></router-link>
            </li>
            <li>
              <router-link :to="{path: '/dakehu/index'}"><span>尊享专区</span></router-link>
            </li>
            <li><span>每实专题</span></li>
            <li>
              <router-link :to="{path: '/site/about-mes'}"><span>关于每实</span></router-link>
            </li>
            <li>
              <span class="tologin" @click="openLoginD">会员登录</span>
            </li>
          </ul>
        </div>
        <div class="footer-about">
          <img src="../assets/images/phone.png">
          <span>订购咨询热线：</span>
          <span class="number">4000 600 700</span>
          <img class="email" src="../assets/images/message.png">
          <a href="mailto:kefu@mesway.com"><span class="toemail">联系我们</span></a>
        </div>
        <div class="footer-ts">
          <span>至少提前5小时订购</span>
          <span>北京五环内免费配送</span>
        </div>
      </div>
    </div>
    <div class="footer-down">
      <p class="footer-info">京ICP备13036207号 京公网安备11011302000938号</p>
      <p class="mes-right">2014@mescake.com All rights reserved</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import vue from 'vue'

export default {
  props: {
    advertisement: {
      type: Array
    }
  },
  data () {
    return {
      imgSrcs: [],
      untouch: [],
      touched: []
    }
  },
  methods: {
    showIcon (index) {
      vue.set(this.untouch, index, false)
      vue.set(this.touched, index, true)
    },
    unShowIcon (index) {
      vue.set(this.untouch, index, true)
      vue.set(this.touched, index, false)
    },
    openLoginD () {
      this.$emit('open-login')
    }
  },
  watch: {
    advertisement () {
      for (let i = 0; i < this.advertisement.length; i++) {
        this.untouch.push(true)
        this.touched.push(false)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .footer-up
    padding-top: 50px
    background: #090909
    .footer-wraper
      max-width: 1200px
      margin: 0 auto
      .footer-ad
        position: relative
        font-size: 0
        padding-bottom: 50px
        border-bottom: 1px solid #2e2e2e
        ul
          display: flex
          justify-content: space-between
          flex-wrap: nowrap
          over-flow: hidden
          li
            position: relative
            .ad-title
              position: absolute
              top: 212px
              width: 230px
              height: 30px
              line-height: 30px
              text-align: center
              font-size: 18px
              font-family: '宋体'
              color: #FFF
              background: #dd0330
              letter-spacing: 2px
              &.fade-enter-active,&.fade-leave-active
                transition: all 0.2s
              &.fade-enter,&.fade-leave-active
                transform: translate3d(0, 30px, 0)
                opacity: 0
            .icon-cover
              position: absolute
              top: 0
              left: 0
              width: 230px
              height: 242px
              opacity: 0.5
              background: #dd0330
              z-index: 50
              &.cover-enter-active,&.cover-leave-active
                transition: all 0.5s
              &.cover-enter,&.cover-leave-active
                opacity: 0
            .ad-icon
              width: 230px
              position: absolute
              top: 80px
              z-index: 100
              &.showup-enter-active,&showup-leave-active
                transition: all 0.5s
              &.showup-enter,&.showup-leave-active
                transform: translate3d(0, 30px, 0)
                opacity: 0
              .icon-pic
                text-align: center
              .icon-text
                text-align: center
                color: #FFF
                font-size: 24px;
                letter-spacing: 3px
                font-family: "arial rounded mt bold"
    .footer-logo
      text-align: center
      margin-top: 20px
    .footer-nav
      margin-top: 20px
      text-align: center
      ul
        font-size: 0
        li
          width: 80px
          height: 20px
          line-height: 20px
          display: inline-block
          &:first-child
            width: 50px
          +li
            border-left: 1px solid rgb(139, 139, 139)
          span
            font-size: 14px
            font-family: "微软雅黑"
            color: rgb(139, 139, 139)
            cursor: pointer
            &:hover
              color: #FFF
    .footer-about
      font-size: 0
      text-align: center
      margin-top: 20px
      img
        vertical-align: middle
        &.email
          margin-left: 30px
      span
        vertical-align: middle
        display: inline-block
        height: 35px
        line-height: 35px
        font-size: 14px
        color: #8B8B8B
        font-family: '宋体'
        &.number
          font-size: 22px
          font-family: "微软雅黑"
        &.toemail
          margin-left: 5px
    .footer-ts
      font-size: 0
      text-align: center
      margin-top: 2px
      padding-bottom: 20px
      span
        display: inline-block
        width: 160px
        height: 20px
        font-size: 14px
        font-family: "微软雅黑"
        color: rgb(139, 139, 139)
        +span
          border-left: 1px solid rgb(139, 139, 139)

  .footer-down
    height: 65px
    font-size: 12px
    font-family: "微软雅黑"
    text-align: center
    color: #090909
    background: #dd0330
    .footer-info
      padding-top: 12px
</style>
