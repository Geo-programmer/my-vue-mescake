<template>
  <div class="cartInfo">
    <p>已成功加入购物车</p>
    <router-link to="/goods/list"><div class="tolist" @click="toListPage">添加更多商品</div></router-link>
    <router-link to="/cart"><div class="tocart" @click="toCartPage">查看购物车</div></router-link>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventHub } from '../eventHub'

export default {
  methods: {
    toListPage () {
      eventHub.$emit('on-closeCartInfo')
    },
    toCartPage () {
      eventHub.$emit('on-closeCartInfo')
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.cartInfo
  width: 300px
  margin: 80px auto 0 auto
  font-size: 18px
  font-family: '微软雅黑'
  color: #FFF
  text-align: center
  .tolist,.tocart
    margin-top: 20px
    text-align: center
    height: 40px
    line-height: 40px
    font-size: 14px
    color: #FFF
    cursor: pointer
    background: #dd0330

</style>
