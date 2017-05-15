<template>
  <div class="resgisterform">
    <div class="title">新用户注册</div>
    <div class="username-check">
      <div class="username">
        <input type="text" placeholder="请输入手机号码">
      </div>
      <div class="tocheck">发送验证码</div>
    </div>
    <div class="verification">
      <input type="text" placeholder="请输入短信验证码">
    </div>
    <div class="password">
      <input type="text" placeholder="设置6位以上登录密码">
    </div>
    <div class="toregister" @click="resgisterNewUser">
      <p>注册</p>
    </div>
    <div class="tologin">如果您已是注册用户，请您<span @click="onLoginDialog">登录</span></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventHub } from '../eventHub'

export default {
  methods: {
    resgisterNewUser () {

    },
    onLoginDialog () {
      eventHub.$emit('on-login')
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
input
  padding: 5px
  border: none
  outline:none
  font-family: "宋体"
  font-size: 13px
  color: #FFF
  background: #282828
.resgisterform
  width: 300px
  margin: 0 auto
  font-size: 14px
  font-family: "宋体"
  .title
    height: 40px
    margin-top: 30px
    margin-bottom: 20px
    text-align: center
    font-size: 18px
    font-weight: bold
    color: #EEE
  .username-check,.password,.verification
    width: 300px
  .password,.verification
    margin-top: 20px
    border-bottom: 1px solid #505050
  .username-check
    display: flex
    margin-top: -15px
    .username
      width: 210px
      align-self: flex-end
      border-bottom: 1px solid #505050
    .tocheck
      width: 85px
      height: 40px
      line-height: 40px
      margin-left: 5px
      text-align: center
      color: #FFF
      background: #dd0330
  .toregister
    margin-top: 20px
    text-align: center
    height: 40px
    line-height: 40px
    color: #FFF
    cursor: pointer
    background: #dd0330
  .tologin
    width: 300px
    height: 40px
    line-height: 40px
    text-align: center
    font-size: 12px
    font-family: "微软雅黑"
    color: #818181
    span
      color: #DD0330
      cursor: pointer

</style>
