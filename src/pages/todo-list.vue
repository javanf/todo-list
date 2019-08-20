<template>
  <div class="todo-content">
    <div class="func-menu" :class="{mode:!showFunc}">
      <div class="li" @click="showFunc=true" v-click-out="test">
        <i class="iconfont">&#xe699;</i>
      </div>
      <div class="li" @click="$refs.createGroupDialog.show()">
        <i class="iconfont">&#xe6b9;</i>
        <span v-if="showFunc==true">新建分组</span>
      </div>
      <div class="li">
        <i class="iconfont">&#xe749;</i>
        <span v-if="showFunc==true">系统消息</span>
      </div>
      <div class="li">
        <i class="iconfont">&#xe6ae;</i>
        <span v-if="showFunc==true">用户设置</span>
      </div>
    </div>
    <list :listData="todoData"></list>
    <c-dialog
      ref="createGroupDialog"
      title="新建任务"
      cancelBtn="取消"
      confirmBtn="确认"
      @confirm="confirmCreateGroup"
      class="new-group"
    >
      <div>
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
      groupName: '',
      showFunc: true
    }
  },
  computed: mapState({
    todoData (state) {
      return state.todoData
    }
  }),
  created () {
    this.$store.dispatch(types.A_GET_TASK_GROUP)
  },
  methods: {
    test () {
      this.showFunc = false
    },
    confirmCreateGroup () {
      this.$store.dispatch(types.A_CREATE_TASK_GROUP, {
        group_title: this.groupName,
        list: []
      }).then(() => {
        this.$store.dispatch(types.A_GET_TASK_GROUP)
      })
    }
  },
  components: {
    List,
    cDialog
  }
}
</script>
