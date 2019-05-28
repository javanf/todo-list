import storage from 'store2'

// 缓存数据的key
const TODO_LIST_DATA = 'TODO_LIST_DATA'

export const todoStorage = {
  set setTodoList (val) {
    if (!val) {
      storage.remove(TODO_LIST_DATA)
    } else {
      storage.set(TODO_LIST_DATA, val)
    }
  },
  get getTodoList () {
    return storage.get(TODO_LIST_DATA)
  }
}
