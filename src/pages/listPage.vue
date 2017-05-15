<template>
  <div>
    <div class="Wraper">
      <div class="wraper-box">
        <div class="title">
          <img src="../assets/images/list_classify.png" alt="list_classify icon"><span>蛋糕分类</span>
        </div>
        <div class="goodslist">
          <ul ref="goodsList">
            <li v-for="(good, index) in goods" class="list-hook" :id="good.name">
              <div class="goodsTitle"><span>{{good.name}} {{good.EnglishName}}</span><img src="../assets/images/down_icon.png"></div>
              <div class="seriesItemes">
                <ul>
                  <li v-for="item in good.goodsforS">
                    <router-link :to="{name: 'detailPage', params:{id: item.id}}">
                      <div class="itemDetail" @click="chooseGood(item)">
                      <img :src="item.img">
                      <p class="itemName">{{item.goodName}}</p>
                      <div class="itemInfo" v-if="item.description">
                        <p class="itemDescription">{{item.description}}</p>
                        <p>类型：<span>{{item.type}}</span></p>
                        <p>原料：<span>{{item.raw}}</span></p>
                        <p>口味：<span>{{item.flavor}}</span></p>
                      </div>
                      <p class="emptyInfo" v-if="!item.description">*装饰品不可食用。</p>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="sideWraper">
      <ul>
        <li v-for="(good, index) in goods" :class="{'current': currentIndex === index}"><a v-scroll-to="scrollTo[index]">{{good.name}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      scrollY: 0,
      listHeight: []
    }
  },
  methods: {
    chooseGood (good) {
      this.$store.commit('updateSelectedGood', good)
    },
    _calculateHeight () {
      this.listHeight = []
      let goodsList = this.$refs.goodsList.getElementsByClassName('list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < goodsList.length; i++) {
        let item = goodsList[i]
        height += item.clientHeight + 15
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    goods () {
      this.$nextTick(() => {
        this._calculateHeight()
      })
    }
  },
  computed: {
    goods () {
      return this.$store.getters.getGoods
    },
    scrollTo () {
      let scrollTo = []
      for (let item of this.goods) {
        scrollTo.push('#' + item.name)
      }
      return scrollTo
    },
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i] - 230
        let height2 = this.listHeight[i + 1] - 230
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  // 不在mounted中调用this._calculateHeight(),就watch不到初始时goods的变化，在listPage页面下刷新便得不到listHeight的值。
  mounted () {
    this._calculateHeight()
  },
  created () {
    window.addEventListener('scroll', () => {
      this.scrollY = document.body.scrollTop
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.Wraper
  background: #181818
  .wraper-box
    max-width: 1100px
    margin: 0 auto
    .title
      padding-top: 60px
      font-size: 0
      img
        vertical-align: middle
      span
        vertical-align: middle
        font-size: 22px
        font-family: '宋体'
        color: #706f6f
    .goodsTitle
      padding-top: 25px
      margin-top: 15px
      font-size: 14px
      font-family: '宋体'
      color: #838383
      border-top: 1px solid #383838
      .englishName
        margin-left: 6px
        vertical-align: middle
      img
        margin-left: 4px
        vertical-align: middle
    .seriesItemes
      margin-top: 10px
      ul
        width: 100%
        display: flex
        flex-wrap: wrap
        li + li
          margin-left: 9px
          &:nth-child(4n+1)
            margin-left: 0
        .itemDetail
          width: 268px
          height: 360px
          background: #090909
          margin-bottom: 20px
          font-size: 14px
          font-family: '宋体'
          color: #c9c9c9
          img
            display: block
            width: 98%
            margin: 0 auto
          p
            font-size: 12px
            padding-left: 15px
            margin-top: 7px
            &.itemName
              font-size: 14px
              color: #f4f4f4
              line-height: 35px
              border-bottom: 1px solid #383838
            &.itemDescription
              margin-top: 15px
              font-weight: bold
              color: #FFF
            span
              color: #FFF
            &.emptyInfo
              margin-top: 15px
              color: red
.sideWraper
  position: fixed
  top: 175px
  left: 50%
  margin-left: 580px
  z-index: 100
  li
    width: 60px
    height: 60px
    border-radius: 60px
    margin-top: 15px
    line-height: 60px
    background: #383838
    font-size: 12px
    color: #b0b0b0
    text-align: center
    cursor: pointer
    a
      display: block
    &:after
      display: block
      position: relative
      left: 50%
      height: 15px
      width: 1px
      border-left: 1px solid #383838
      content: ''
    &:last-child:after
      display: none
    &.current
      color: #FFF
      background: #dd0330
</style>
