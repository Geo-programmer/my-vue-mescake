<template>
  <div class="cart">
    <div class="cartWraper">
      <div class="cartTitle">
        <img src="../assets/images/vip_shoppingcart.png">
        <span class="title">购物车</span>
      </div>
      <div class="cartList" v-if="!isEmpty">
        <div class="cartTable">
          <div class="name">
            <span class="one">商品</span><span class="two">数量</span><span class="three">单价</span><span class="four">小计</span>
          </div>
          <div class="tablebody" v-for="(item, index) in goods">
            <div class="info">
              <div class="info-left">
                <img :src="item.good.img">
              </div>
              <div class="info-right">
                <p class="itemName">{{item.good.goodName}}</p>
                <p class="itemDes">{{item.good.description}}</p>
                <p class="itemSize">{{item.good.choices[item.selectedIndex].size}}</p>
                <p class="itemFree">{{item.good.choices[item.selectedIndex].freeItem}}</p>
              </div>
            </div>
            <div class="counter">
              <count :pageType="1" :currentIndex="index" @on-changeNum="updateCount(index, $event)"></count>
            </div>
            <div class="price">￥{{item.good.choices[item.selectedIndex].price}}</div>
            <div class="totalPrice">￥{{item.good.choices[item.selectedIndex].price*item.count}}</div>
            <div class="deleteIcon" @click="deleteGood(index)">
              <img src="../assets/images/vip_recycle.png" alt="icon">
            </div>
          </div>
          <div class="tablebody canju" v-show="showSerive">
            <div class="info">
              <div class="info-left">
                <img src="/static/canju.png">
              </div>
              <div class="info-right">
                <p class="itemName">付费餐具</p>
                <p class="itemSize">规格:1.0磅;含餐具:5套;切块 否</p>
              </div>
            </div>
            <div class="counter">
              <count :pageType="1" @on-changeNum="updateSerCount($event)"></count>
            </div>
            <div class="price">￥0.5</div>
            <div class="totalPrice">￥{{0.5*this.seriveCount}}</div>
            <div class="deleteIcon" @click="deleteService">
              <img src="../assets/images/vip_recycle.png" alt="icon">
            </div>
          </div>
        </div>
        <div class="cartTotal">
          <div class="add" @click="addSerive">
            <img src="../assets/images/vip_triangle.png" alt="icon">
            <span>添加额外餐具</span>
          </div>
          <div class="totalPriceWraper">
            <span class="">总计:</span><span class="number">￥{{allPrice}}</span>
          </div>
          <div class="btnWraper">
            <router-link to="/goods/list"><div class="shopping">继续购物</div></router-link>
            <div class="checkout" @click="toCheckout">进入结算</div>
          </div>
        </div>
      </div>
      <div class="empty" v-if="isEmpty">
        <img src="../assets/images/emptycart.jpg" alt="cart icon">
        <p>购物车空空如也～</p>
        <router-link to="/"><div class="tofontPage">立即选购</div></router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventHub } from '../eventHub'
import count from '../components/count'

export default {
  data () {
    return {
      showSerive: false,
      seriveCount: 0
    }
  },
  computed: {
    goods () {
      return this.$store.getters.getcartGoods
    },
    allPrice () {
      let price = 0
      for (let item of this.goods) {
        price += item.good.choices[item.selectedIndex].price * item.count
      }
      price += 0.5 * this.seriveCount
      return price
    },
    isEmpty () {
      if (this.goods.length === 0 && this.seriveCount === 0) {
        return true
      }
      return false
    }
  },
  methods: {
    updateCount (index, val) {
      this.$store.commit('updateGoodCount', {index, val})
    },
    updateSerCount (val) {
      this.seriveCount = val
    },
    addSerive () {
      if (this.showSerive) {
        return
      }
      this.showSerive = true
      this.seriveCount = 1
    },
    deleteGood (index) {
      this.$store.commit('deleteFromGoods', index)
    },
    deleteService () {
      this.showSerive = false
      this.seriveCount = 0
    },
    toCheckout () {
      if (this.$store.getters.getLoginstatus) {
        alert('结算中')
      } else {
        eventHub.$emit('on-login')
      }
    }
  },
  watch: {
    seriveCount () {
      this.$store.commit('updatetableware', {count: this.seriveCount})
    }
  },
  components: {
    count
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.cart
  background: #eef0f1
  padding-top: 45px
  padding-bottom: 60px
  font-size: 0
  .cartWraper
    width: 1200px
    margin: 0 auto
    background: #FFF
    .cartTitle
      height: 55px
      padding-left: 45px
      line-height: 55px
      background: #FFF
      border: 1px solid #ddd
      font-size: 0
      img
        position: relative
        top: -2px
        vertical-align: middle
        width: 25px
        height: 25px
      .title
        margin-left: 5px
        font-size: 18px
        color: #706f6f
        font-family: '宋体'
        vertical-align: middle
    .cartList
      width: 1060px
      margin: 0 auto
      .cartTable
        .name
          span
            padding-top:  15px
            display: inline-block
            font-size: 14px
            text-align: center
            &.one
              width: 360px
            &.two
              width: 192px
            &.three
              width: 170px
            &.four
              width: 167px
        .tablebody
          margin-top: 15px
          display: flex
          height: 140px
          .info
            display: flex
            width: 360px
            border: 1px solid #ddd
            .info-left
              width: 130px
              text-align: center
              line-height: 140px
              img
                vertical-align: middle
                width: 100px
                height: 100px
            .info-right
              width: 230px
              margin-left: 5px
              margin-top: 30px
              .itemName
                font-size: 14px
              .itemDes
                margin-top: 5px
                font-size: 12px
              .itemSize,.itemFree
                margin-top: 12px
                font-size: 12px
                color: #999
          .counter
            width: 192px
            display: flex
            justify-content: center
            align-items: center
            border: 1px solid #ddd
            border-left: none
          .price,.totalPrice
            width: 170px
            font-size: 18px
            text-align: center
            line-height: 140px
            border: 1px solid #ddd
            border-left: none
          .deleteIcon
            width: 165px
            line-height: 140px
            text-align: center
            border: 1px solid #ddd
            border-left: none
            img
              vertical-align: middle
          &.canju
            height: 95px
            .info-left
              line-height: 95px
              img
                width: 60px
                height: 60px
            .price,.totalPrice,.deleteIcon
              line-height: 95px
      .cartTotal
        padding-top: 35px
        padding-bottom: 25px
        .add
          position: relative
          left: 892px
          width: 164px
          height: 52px
          border: 1px solid #000
          text-align: center
          line-height: 52px
          border-radius: 3px
          cursor: pointer
          img
            position: absolute
            left: 5px
            bottom: 5px
          span
            font-size: 14px
        .totalPriceWraper
          position: relative
          left: 915px
          margin-top: 20px
          font-size: 16px
          font-family: '宋体'
          .number
            font-size: 24px
            font-weight: bold
        .btnWraper
          display: flex
          justify-content: flex-end
          margin-top: 40px
          font-size: 16px
          .shopping,.checkout
            width: 114px
            height: 44px
            margin-right: 5px
            margin-left: 5px
            line-height: 44px
            text-align: center
            color: #fff
            cursor: pointer
            border-radius: 3px
          .shopping
            background: #181818
          .checkout
            background: #dd0330
    .empty
      width: 1060px
      height: 450px
      margin: 0 auto
      text-align: center
      padding-top: 60px
      img
        margin-left: -20px
        width: 200px
        height: 240px
      p
        margin-top:15px
        font-size: 18px
      .tofontPage
        margin: 15px auto
        width: 130px
        height: 55px
        font-size: 16px
        background: #8cc44f
        color: #FFF
        line-height: 55px
        border-radius: 6px



</style>
