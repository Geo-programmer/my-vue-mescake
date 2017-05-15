<template>
  <div>
    <font-swiper></font-swiper>
    <div class="Wraper">
      <div class="TitleWraper">
        <div class="titleline"></div>
        <div class="titleContent">
          <img src="../assets/images/cake_classify.png"><span class="titleText">蛋糕分类</span>
        </div>
        <div class="titleline"></div>
      </div>
      <div class="goodsWraper">
        <div class="goodsitem" v-for="item in goods" v-if="item.isShow">
          <router-link :to="{path: '/goods/list', hash: item.name}">
            <img :src="item.backgroudImg">
            <p class="goodName">{{item.name}}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import fontSwiper from '../components/swiper'

// const ERR_OK = 0
export default {
  computed: {
    goods () {
      return this.$store.getters.getGoods
    }
  },
  components: {
    fontSwiper
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.Wraper
  background: #181818
  padding-bottom: 80px
  .TitleWraper
    display: flex
    max-width: 1200px
    height: 60px
    margin: 0 auto
    padding-top: 30px
    .titleline
      flex: 1
      height: 1px
      align-self: center
      background: #2e2e2e
    .titleContent
      flex: 0 0 160px
      text-align: center
      img
        vertical-align: middle
      .titleText
        vertical-align: middle
        font-size: 20px
        font-family: "微软雅黑"
        color: #c9c9c9
        margin-left: 15px
  .goodsWraper
    display: flex
    max-width: 1200px
    flex-wrap: wrap
    justify-content: space-between
    margin: 0 auto
    .goodsitem
      position: relative
      text-align: center
      font-size: 0
      margin-top: 30px
      cursor: pointer
      .goodName
        position: absolute
        width: 100%
        top: 190px
        font-size: 30px
        line-height: 40px
        letter-spacing: 10px
        font-family: "arial rounded mt bold"
        color: #FFF
</style>
