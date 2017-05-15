<template>
  <div class="loginform">
    <div class="title">用户登录</div>
    <div class="username">
      <img src="../assets/images/people.png"><input v-model.lazy="userPhoneNum" type="text" placeholder="手机号码">
    </div>
    <div class="password">
      <img src="../assets/images/key.png"><input v-model.lazy="userPassword" type="text" placeholder="用户密码">
    </div>
    <p class="errnoInfo">{{userError.errorText}}</p>
    <div class="r-status">
      <div class="r-check">
        <input type="checkbox"><span>记住登录</span>
      </div>
      <div class="f-password">
        <a href="#">忘记密码？</a>
      </div>
    </div>
    <div class="tologin" @click="LoginUser">
      <p>登录</p>
    </div>
    <div class="toregister" @click="onResgisterDialog">
      <p>新用户注册</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { eventHub } from '../eventHub'

const ERR_OK = 0

export default {
  data () {
    return {
      userPhoneNum: '',
      userPassword: ''
    }
  },
  computed: {
    userError () {
      let errorText, status
      let usernameString = String(this.userPhoneNum)
      if (this.userPhoneNum !== '' && !/^\d{11}$/g.test(usernameString)) {
        status = false
        errorText = '手机号码格式错误'
      } else {
        status = true
        errorText = ''
      }
      return {
        status,
        errorText
      }
    },
    isShow () {
      if (this.errnoText !== '') {}
    }
  },
  methods: {
    LoginUser () {
      if (this.userError.status) {
        this.$http.get('/api/login')
        .then((res) => {
          let response = res.body
          if (response.errno === ERR_OK) {
            let loginstatus = response.data
            if (loginstatus.loginCode === 1) {
              this.$store.commit('updateloginstatus', true)
              this.$store.commit('updateUsername', this.userPhoneNum)
              eventHub.$emit('has-login')
            }
          }
        })
      }
    },
    onResgisterDialog () {
      eventHub.$emit('on-resgister')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
input
  padding: 5px
  border: none
  outline:none
  background: #282828
  font-family: "宋体"
  font-size: 13px
  color: #FFF
.loginform
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
  .username,.password
    width: 300px
    border-bottom: 1px solid #505050
    img
      vertical-align:middle
    input
      width: 270px
  .password
    margin-top: 20px
  .errnoInfo
    margin-top: 10px
    font-size: 14px
    font-family: '微软雅黑'
    color: #FFF
  .r-status
    width: 300px
    display: flex
    margin-top: 15px
    justify-content: space-between
    font-size: 12px
    .r-check
      input
        margin-left: 4px
        vertical-align: top
      span
        margin-left: 5px
        color: #c9c9c9
    .f-password
      a
        color: #dd0330
  .tologin,.toregister
    text-align: center
    height: 40px
    line-height: 40px
    color: #FFF
    font-family: "微软雅黑"
    cursor: pointer
  .tologin
    margin-top: 20px
    background: #dd0330
  .toregister
    margin-top: 10px
    background: #c9c9c9
</style>
