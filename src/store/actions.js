'use strict'

import * as type from './types'

const actions = {
  [type.A_GET_TODO_LIST] ({ commit }, params) {
    commit(type.M_GET_TODO_LIST, {})
  }
}

export default actions
