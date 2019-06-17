'use strict'

import * as types from './types'
import http from '../commons/http'

const actions = {
  [types.A_CREATED_TASK] ({ commit }, params) {
    http({
      method: 'POST',
      url: '/task/update-task',
      json: true,
      data: params
    }).then(() => {
      commit(types.M_ADD_TODO_LIST_ITEM, params)
    })
  },
  [types.A_CREATE_TASK_GROUP] ({ commit }, params) {
    http({
      method: 'POST',
      url: '/task/create-task-group',
      json: true,
      data: params
    }).then(() => {
      commit(types.M_CREATE_TASK_GROUP, params)
    })
  },
  [types.A_GET_TASK_GROUP] ({ commit }, params) {
    http({
      method: 'GET',
      url: '/task/get-task-list',
      json: true,
      data: params
    }).then(({data}) => {
      commit(types.M_GET_TASK_GROUP, data)
    })
  }
}

export default actions
