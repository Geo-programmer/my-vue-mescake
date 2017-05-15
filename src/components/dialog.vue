<template>
  <div>
    <div class="dialog-wraper">
      <div class="dialog-cover">
      </div>
      <div class="dialog-content">
        <div class="close" @click="closeDialog"><img src="../assets/images/closed.png"></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {

  },
  data () {
    return {
    }
  },
  methods: {
    closeDialog () {
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.dialog-wraper
  position: fixed
  width: 100%
  height: 100%
  .dialog-cover
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #000
    opacity: 0.6
    z-index: 100
  .dialog-content
    position: fixed
    top: 50%
    left: 50%
    margin-left: -225px
    margin-top: -195px
    width: 450px
    height: 390px
    border-radius: 8px
    background: #282828
    z-index: 200
    box-shadow: #000 0px 0px 10px;
    .close
      position: absolute
      top: 0
      right: 10px
      padding: 10px
      cursor: pointer

</style>
