<template>
  <div id="user-login-register">
    <div id="login" v-if="type=='Login'">
      <div class="form">
        <h1>用户登录</h1>
        <div class="c-input">
          <label for="">用户名</label>
          <input type="text" v-model="username" placeholder="请输入用户名">
        </div>
        <div class="c-input">
          <label for="">密码</label>
          <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <div class="c-input">
          <label for="">&nbsp;</label>
          <input class="btn" type="button" value="登录" @click="login">
        </div>
      </div>
    </div>
    <div id="register" v-else>
      <div class="form">
        <h1>用户注册</h1>
        <div class="c-input">
          <label for="">用户名</label>
          <input type="text" v-model="username" placeholder="请输入用户名">
        </div>
        <div class="c-input">
          <label for="">密码</label>
          <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <div class="c-input">
          <label for="">重复密码</label>
          <input type="password" v-model="password2" placeholder="再次输入密码">
        </div>
        <div class="c-input">
          <label for="">&nbsp;</label>
          <input class="btn" type="button" value="注册" @click="register">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../../store/types.js'

export default {
  data () {
    return {
      type: this.$route.name,
      username: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    login () {
      let vm = this
      vm.$store.dispatch(types.A_LOGIN, {
        username: vm.username,
        password: vm.password
      }).then((data) => {
        vm.$router.push({
          name: 'TodoList'
        })
      }, (err) => {
        console.log(err)
      })
    },
    register () {
      let vm = this
      vm.$store.dispatch(types.A_REGISTER, {
        username: vm.username,
        password: vm.password,
        password2: vm.password2
      }).then(() => {
        vm.$router.push({
          name: 'Login',
          query: {
            type: 1
          }
        })
      })
    }
  }
}
</script>

<style lang='stylus'>
  @import './login.styl';
</style>
