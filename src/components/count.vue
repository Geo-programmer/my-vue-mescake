<template>
  <div class="counterWraper">
    <div class="counter-btn" @click="minus" :class="countType">-</div>
      <div class="counter-show" :class="countType">
        {{showNumber}}
      </div>
      <div class="counter-btn" @click="add" :class="countType">+</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      baseNum: 0,
      countNumber: 1
    }
  },
  props: {
    pageType: Number,
    currentIndex: {
      type: Number,
      default: null
    }
  },
  computed: {

    countType () {
      if (this.pageType === 0) {
        return 'detailPage'
      }
      if (this.pageType === 1) {
        return 'cartPage'
      }
    },
    showNumber () {
      return this.countNumber + this.baseNum
    }
  },
  methods: {
    minus () {
      if (this.showNumber === 1) {
        return
      }
      this.baseNum = this.baseNum - 1
    },
    add () {
      this.baseNum = this.baseNum + 1
    }
  },
  watch: {
    showNumber () {
      this.$emit('on-changeNum', this.showNumber)
    }
  },
  created () {
    if (this.currentIndex) {
      this.countNumber = this.$store.getters.getcartGoods[this.currentIndex].count
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.counterWraper
  display: flex
  box-sizing: border-box
  .counter-btn
    cursor: pointer
    &.detailPage
      width: 20px
      height: 20px
      line-height: 24px
      font-size: 20px
      color: #FFF
      text-align: center
      background: #000
      font-family: '宋体'
    &.cartPage
      width: 26px
      height: 26px
      line-height: 22px
      font-size: 24px
      text-align: center
      color: #090909
      border: 1px solid #ddd
  .counter-show
    &.detailPage
      width: 26px
      height: 20px
      line-height: 18px
      font-size: 12px
      text-align: center
      border: 1px solid #000
    &.cartPage
      width: 50px
      height: 26px
      line-height: 26px
      font-size: 18px
      text-align: center
      border: 1px solid #ddd

</style>
