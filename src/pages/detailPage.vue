<template>
  <div>
    <div class="pickWraper">
      <div class="pickWraper-left">
        <img :src="selectedGood.imgfortitle">
      </div>
      <div class="pickWraper-right">
        <p class="goodname">{{selectedGood.goodName}}</p>
        <p class="gooddescription">{{selectedGood.description}}</p>
        <div class="choice-box" v-show="selectedGood.id !== 67">
          <div class="choice-item" v-for="(choiceItem, index) in selectedGood.choices" :class="{'current': currentIndex === index, 'isnearby': selectedGood.class === 2}" @click="updateChoice(index)">
            <p class="size">{{choiceItem.size}}</p>
            <p class="apply">{{choiceItem.apply}}</p>
            <p class="free">{{choiceItem.freeItem}}</p>
            <img src="../assets/images/role.png" class="downicon">
          </div>
        </div>
        <div class="lazhu" v-show="selectedGood.id === 67">
          <span v-for="(choiceItem, index) in selectedGood.choices" :class="{'current': lazhuIndex === index}" @click="updateChoice(index)">{{choiceItem.Number}}</span>
        </div>
        <div class="line"></div>
        <div class="choice-number">
          <div class="countWraper">
            <count :pageType="countType" @on-changeNum="updatePrice($event)"></count>
          </div>
          <span>￥{{totelPrice}}</span>
        </div>
        <div class="choice-btn">
          <div class="shoppingCart" @click="addToCart">加入购物车</div>
          <div class="order" @click="toCheckout">立即订购</div>
        </div>
        <div class="about-mes">
          <p>配送范围：北京五环内免费配送 | 请至少提前5个小时订购</p>
          <p class="phoneNumber">咨询热线：<span>4000 600 700</span></p>
        </div>
      </div>
    </div>
    <div class="bigPicBox" v-show="selectedGood.class === 0">
      <img :src="selectedGood.Bigimg">
    </div>
    <div class="picDetail" :class="{'bigPicture': selectedGood.class === 0, 'bigOne': selectedGood.id === 135}">
      <div class="picTitle" v-show="selectedGood.class">
        <img src="../assets/images/introduce.png" alt="icon">
        <span>商品详情</span>
      </div>
      <div class="picBox" :class="{'bigOne': selectedGood.id === 135}">
        <img :src="address" alt="introduce" v-for="address in selectedGood.imgforDes">
      </div>
      <div class="declareBox" v-show="selectedGood.class">
        <div class="declare">
          <div class="declareItem">
            <img src="../assets/images/introduce_ico01.png" alt="icon">
            <p class="declareText">坚持只使用100%</p>
            <p class="declareText">纯进口乳脂奶油</p>
          </div>
          <div class="declareItem">
            <img src="../assets/images/introduce_ico02.png" alt="icon">
            <p class="declareText">绝不添加任何色素</p>
          </div>
          <div class="declareItem">
            <img src="../assets/images/introduce_ico03.png" alt="icon">
            <p class="declareText">绝不添加任何香精</p>
          </div>
          <div class="declareItem">
            <img src="../assets/images/introduce_ico04.png" alt="icon">
            <p class="declareText">绝不添加任何防腐剂</p>
          </div>
        </div>
      </div>
      <div class="infoBox" v-show="selectedGood.class">
        <div class="infomation">
          <p class="infoTitle">温馨提示：</p>
          <ul>
            <li>本品由MES每实蛋糕提供。</li>
            <li>配送范围和时限:北京5环内免费送货。</li>
            <li>如需发票，请提前联系客服。</li>
            <li>为了确保产品质量，建议您收到产品时先验货再签收。</li>
            <li>蛋糕产品由于没有任何人工添加，需冷藏保存；为了保证最佳口感，请在收到后3小时内食用。</li>
            <li>蛋糕食材在产品中已有公示，过敏者请审慎选择或者订购其他产品。</li>
            <li>如对产品和服务有任何疑问，请联系客服，咨询热线：4000 600 700</li>
          </ul>
        </div>
      </div>
    </div>
    <div bigPic>
      <img src="" alt="">
      <div class="picDeBox">

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import count from '../components/count'
import { eventHub } from '../eventHub'

export default {
  data () {
    return {
      countType: 0,
      currentIndex: 0,
      chooseNum: 1,
      lazhuIndex: 0
    }
  },
  methods: {
    updateChoice (index) {
      this.currentIndex = index
      this.lazhuIndex = index
    },
    updatePrice (val) {
      this.chooseNum = val
    },
    addToCart () {
      this.$store.commit('updatecartGoods', this.goodToCart)
      eventHub.$emit('on-cartInfo')
    },
    toCheckout () {
      if (this.$store.getters.getLoginstatus) {
        alert('正在前往结算页面')
      } else {
        eventHub.$emit('on-login')
      }
    }
  },
  // 由于组件的复用，vuex及detail中的selectedGood不会更新。避免detailPage在前进后退时，selectedGood与当前页面的路由id不匹配，不匹配时直接跳转到首页
  watch: {
    '$route' (to, from) {
      if (to.params.id && (this.$route.params.id !== this.selectedGood.id)) {
        this.$router.replace('/')
      }
    }
  },
  computed: {
    selectedGood () {
      return this.$store.getters.getSelectedGood
    },
    totelPrice () {
      return this.selectedGood.choices[this.currentIndex].price * this.chooseNum
    },
    goodToCart () {
      return {
        good: this.selectedGood,
        selectedIndex: this.currentIndex,
        count: this.chooseNum
      }
    }
  },
  components: {
    count
  },
  created () {
    this.$store.commit('updateSelectedGood')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pickWraper
  display: flex
  max-width: 1200px
  height: 532px
  margin: 0 auto
  border: 1px solid #dddddd;
  margin-top: 40px;
  border-radius: 5px
  padding-left: 50px
  padding-top: 40px
  font-family: '微软雅黑'
  .pickWraper-right
    margin-left: 55px
    .goodname
      font-size: 21px
    .gooddescription
      margin-top: 5px
      font-size: 16px
      color: #df143e
    .choice-box
      display: flex
      flex-wrap: wrap
      width: 400px
      margin-top: 10px
      .choice-item
        position: relative
        width: 160px
        height: 75px
        margin-top: 10px
        margin-right: 10px
        padding-top: 10px
        font-size: 14px
        text-align: center
        vertical-align: middle
        border: 1px solid #090909
        cursor: pointer
        .apply
          margin-top: 5px
          margin-bottom: 5px
          font-size: 12px
          color: #dd0330
        .downicon
          position: absolute
          right: 5px
          bottom: 5px
        &.current
          color: #FFF
          background: #dd0330
          .apply
            color: #FFF
        &.isnearby
          padding-top: 30px
    .lazhu
      span
        display:inline-block
        width: 30px
        height: 30px
        line-height: 30px
        text-align: center
        border: 1px solid #090909
        cursor: pointer
        &.current
          background: #dd0330
          color: #FFF
    .line
      width: 330px
      height: 1px
      margin-top: 15px
      margin-bottom: 18px
      background: #ddd
    .choice-number
      font-size: 0
      .countWraper
        display: inline-block
        vertical-align: middle
      span
        vertical-align: middle
        margin-left: 32px
        font-size: 30px
        font-family: '微软雅黑'
    .choice-btn
      display: flex
      margin-top: 20px
      .shoppingCart,.order
        width: 130px
        height: 50px
        line-height: 50px
        text-align: center
        font-size: 18px
        color: #FFF
        cursor: pointer
      .shoppingCart
        background: #090909
      .order
        margin-left: 20px
        background: #dd0330
    .about-mes
      margin-top: 20px
      font-size: 12px
      color: #333333
      .phoneNumber
        margin-top: 10px
        span
          font-size: 14px
          color: #dd0330
.bigPicBox
  font-size: 0
  width: 100%
  overflow: hidden
  img
    position: relative
    left: 50%
    top: 0
    margin-left: -1280px
    overflow: hidden
.picDetail
  padding: 30px 0 40px 0
  .picTitle
    max-width: 1200px
    margin: 0 auto
    height: 45px
    font-size: 0
    border-top-left-radius: 5px
    border-top-right-radius: 5px
    border: 1px solid #ddd
    img
      margin-left: 50px
      vertical-align: middle
    span
      margin-left: 5px
      vertical-align: middle
      font-size: 18px
      line-height: 45px
      color: #333
  .picBox
    max-width: 1200px
    margin: 0 auto
    font-size: 0
    border-left: 1px solid #ddd
    border-right: 1px solid #ddd
    img
      width: 100%
    &.bigOne
      max-width: 100%
      overflow: hidden
      border: none
      img
        width: 2560px
        position: relative
        left: 50%
        margin-left: -1280px
  .declareBox
    max-width: 1200px
    margin: 0 auto
    border: 1px solid #ddd
    .declare
      display: flex
      flex-wrap: wrap
      width: 800px
      margin: 30px auto
      .declareItem
        width: 400px
        height: 150px
        margin-top: 40px
        text-align: center
        font-size: 14px
        color: #838383
  .infoBox
    max-width: 1200px
    margin: 0 auto
    height: 185px
    border-left: 1px solid #ddd
    border-right: 1px solid #ddd
    border-bottom: 1px solid #ddd
    padding-left: 340px
    padding-top: 20px
    .infomation
      font-size: 12px
      color: #838383
      .infoTitle
        font-size: 14px
        margin-bottom: 10px
      ul
        li
          margin-top: 5px
          list-style-type: disc
  &.bigPicture
    background: #d9d9d9
  &.bigOne
    padding-top: 0


</style>
