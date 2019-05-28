'use strict'
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { todoStorage } from '../commons/storage'

Vue.use(Vuex)

let state = {
  todoData: todoStorage.getTodoList || [{
    title: '待处理',
    list: []
  }, {
    title: '进行中',
    list: []
  }, {
    title: '已完成',
    list: []
  }]
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
