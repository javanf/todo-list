<template>
  <div class="todo-content">
    <div class="func-ment">
      <div class="li" @click="$refs.createGroupDialog.show()">新建分组</div>
    </div>
    <list :listData="todoData"></list>
    <c-dialog
      ref="createGroupDialog"
      title="新建任务"
      cancelBtn="取消"
      confirmBtn="确认"
      @confirm="confirmCreateGroup"
    >
      <div class="item-detail">
        <ul>
          <li class="dis-flex">
            <div class="w-80">分组名称</div>
            <div class="flex1">
              <input type="text" v-model="groupName">
            </div>
          </li>
        </ul>
      </div>
    </c-dialog>
  </div>
</template>

<script>
import List from '../components/list'
import {
  mapState
} from 'vuex'
import * as types from '../store/types.js'
import cDialog from '../components/dialog'

export default {
  data () {
    return {
      groupName: ''
    }
  },
  computed: mapState({
    todoData (state) {
      return state.todoData
    }
  }),
  methods: {
    confirmCreateGroup () {
      this.$store.commit(types.M_CREATE_TODO_LIST_GROUP, {
        title: this.groupName,
        list: []
      })
    }
  },
  components: {
    List,
    cDialog
  }
}
</script>
