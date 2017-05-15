<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide class="slide-custom"><img src="/static/swiper/slide01.jpg"></swiper-slide>
    <swiper-slide class="slide-custom"><img src="/static/swiper/slide02.jpg"></swiper-slide>
    <swiper-slide class="slide-custom"><img src="/static/swiper/slide03.jpg"></swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'carrousel',
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        autoplay: 3000,
        direction: 'horizontal',
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        observeParents: true
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
img
  width: 100%
.slide-custom
  font-size: 0
</style>
