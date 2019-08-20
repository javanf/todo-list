import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/pages/todo-list'
import User from '@/pages/user'
import Login from '@/pages/user/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'TodoList',
    component: TodoList
  }, {
    path: '/user/login',
    name: 'Login',
    component: Login
  }, {
    path: '/user',
    name: 'User',
    component: User,
    children: [{
      path: '/user/login',
      name: 'Login',
      component: Login
    }, {
      path: '/user/register',
      name: 'Register',
      component: Login
    }]
  }]
})
