'use strict'

import * as types from './types'
import { todoStorage } from '../commons/storage'

const mutations = {
  [types.M_GET_TASK_GROUP] (state, data) {
    let map = {}
    let temps = []
    data.map(item => {
      let ekey = item.group_id
      temps = map[ekey] || []
      temps.push(item)
      map[ekey] = temps
    })
    let list = []
    for (let ekey in map) {
      list.push({
        group_id: ekey,
        group_title: map[ekey][0].g_title,
        list: map[ekey].filter(item => item.id)
      })
    }
    state.todoData = list
    todoStorage.setTodoList = state.todoData
  },
  [types.M_CREATE_TASK_GROUP] (state, data) {
    state.todoData.push(data)
    todoStorage.setTodoList = state.todoData
  },
  [types.M_CREATE_TODO_LIST_GROUP] (state, data) {
    state.todoData.push(data)
    todoStorage.setTodoList = state.todoData
  }
}

export default mutations
