// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import commons from './directives/commons'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.directive('clickOut', commons.clickOut)
Vue.use(new VueSocketIO({
  debug: true,
  // 服务器端地址
  connection: 'http://localhost:3000'
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
