'use strict'

import * as types from './types'
import moment from 'moment'
import { todoStorage } from '../commons/storage'

const mutations = {
  [types.M_CREATE_TODO_LIST_GROUP] (state, data) {
    state.todoData.push(data)
    todoStorage.setTodoList = state.todoData
  },
  [types.M_GET_TODO_LIST] (state, data) {
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
