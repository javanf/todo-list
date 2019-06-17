'use strict'

import * as types from './types'
import moment from 'moment'
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
  },
  [types.M_ADD_TODO_LIST_ITEM] (state, data) {
    if (!data) {
      todoStorage.setTodoList = state.todoData
    } else {
      if (data.item.id) {
        state.todoData.map(groupItem => {
          groupItem.list.map((item, index) => {
            if (item.id === data.item.id) {
              item = data.item
              groupItem.list.splice(index, 1, item)
            }
          })
          return groupItem
        })
        todoStorage.setTodoList = state.todoData
      } else {
        let list = state.todoData[data.index].list
        data.item.id = moment().valueOf()
        list.push(data.item)
      }
      todoStorage.setTodoList = state.todoData
    }
  }
}

export default mutations
