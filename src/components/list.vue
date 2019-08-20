<template>
  <div class="section">
    <div id="list" class="clearfix">
      <div class="list-group" v-for="(item, index) in listData" v-bind:key="index">
        <div class="list-title">{{item.group_title}}
          <span class="add-item" @click="addItem(item.group_id)">+</span>
        </div>
        <draggable
          class="draggable"
          :class="{active:current===item.group_id}"
          :data-index="item.group_id"
          :move="onMoveCallback"
          :list="item.list"
          v-bind="dragOptions"
          @end="endDrag"
          @start="drag = true"
          group="people"
          :name="!drag ? 'flip-list' : null"
        >
          <div class="draggable-item" v-for="element in item.list" :data-item="element" v-bind:key="element.id" @click="editListItem(element)">
            <list-item :objData="element"></list-item>
          </div>
        </draggable>
      </div>
    </div>
    <c-dialog
      ref="itemDetail"
      :title="listItem.id ? '编辑': '新增'"
      cancelBtn="取消"
      confirmBtn="确认"
      @confirm="itemDetailConfirm"
      class="item-detail"
    >
      <div>
        <ul>
          <li class="dis-flex">
            <div class="w-80">概要</div>
            <div class="flex1">
              <input type="text" v-model="listItem.title">
            </div>
          </li>
          <li class="dis-flex">
            <div class="w-80">描述</div>
            <div class="flex1">
              <textarea v-model="listItem.description" id="" cols="30" rows="10"></textarea>
            </div>
          </li>
          <li class="dis-flex">
            <div class="w-80">附件</div>
            <div class="flex1">
              <img class="img-pre" :src="img" @click="preview(img)" v-for="(img, index) in listItem.imgs" :key="index">
              <div class="add-img-btn" @click="clickFileInput">
                <i class="iconfont">&#xe6b9;</i>
              </div>
              <input class="file-input" ref="fileInput" type="file" @change="fileChange" />
            </div>
          </li>
          <li class="dis-flex">
            <div class="w-80">优先级</div>
            <div class="flex1 relative">
              <input type="text" @click="showLevelSelect=true" v-click-out="hideSelect" :value="listItem.level|filterLevel(LEVEL_LIST)" readonly>
              <c-select v-if="showLevelSelect" :list="LEVEL_LIST" @select="levelSelect"></c-select>
            </div>
          </li>
        </ul>
      </div>
    </c-dialog>
    <c-dialog
      ref="previewImg"
      title=""
      cancelBtn=""
      confirmBtn=""
      class="preview-img"
    >
      <div>
        <img class="img-pre" :src="previewImg">
      </div>
      <i class="close iconfont"  @click="$refs.previewImg.hide()">&#xe69a;</i>
    </c-dialog>
  </div>
</template>

<script>
import ListItem from './list-item'
import Draggable from 'vuedraggable'
import cDialog from './dialog'
import cSelect from './select'
import * as types from '../store/types.js'

export default {
  props: {
    listData: {
      type: [Array],
      default: () => []
    }
  },
  components: {
    ListItem,
    Draggable,
    cDialog,
    cSelect
  },
  data () {
    return {
      current: '',
      drag: false,
      currentTask: '',
      groupIndex: '',
      previewImg: '',
      listItem: {
        title: '',
        description: '',
        level: 0,
        imgs: []
      },
      showLevelSelect: false,
      LEVEL_LIST: [{
        value: 0,
        label: '普通'
      }, {
        value: 1,
        label: '紧急'
      }, {
        value: 2,
        label: '非常紧急'
      }]
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  filters: {
    filterLevel (value, list) {
      let label = ''
      list.map(item => {
        if (item.value === +value) {
          label = item.label
        }
      })
      return label
    }
  },
  created() {
    // 接收服务端的信息
    this.sockets.subscribe('update-task-callback', (data) => {
      console.log('update-task-callback', data)
      this.$store.commit(types.M_GET_TASK_GROUP, data)
    })
  },
  methods: {
    hideSelect () {
      this.showLevelSelect = false
    },
    levelSelect (item) {
      this.listItem.level = item.value
    },
    clickFileInput () {
      this.$refs.fileInput.dispatchEvent(new MouseEvent('click'))
    },
    preview (img) {
      this.previewImg = img
      this.$refs.previewImg.show()
    },
    fileChange (e) {
      let vm = this
      // input 改变事件
      let file = e.target.files[0]
      console.log(file)
      // 文件转base64
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        console.log(reader.result)
        vm.listItem.imgs.push(reader.result)
      }
    },
    touchStart (item) {
      console.log(item)
    },
    endDrag () {
      this.drag = false
      // this.$store.dispatch(types.A_CREATED_TASK, {
      //   group_id: this.current,
      //   item: this.currentTask
      // })
      this.$socket.emit('update-task', {
        group_id: this.current,
        item: this.currentTask
      })
      this.current = ''
    },
    itemDetailConfirm () {
      this.$store.dispatch(types.A_CREATED_TASK, {
        group_id: this.groupIndex,
        item: this.listItem
      })
    },
    editListItem (item) {
      this.listItem = Object.assign({
        imgs: []
      }, item)
      this.groupIndex = item.group_id
      this.$refs.itemDetail.show()
    },
    addItem (index) {
      this.groupIndex = index
      this.listItem = {
        title: '',
        description: '',
        level: 0,
        imgs: []
      }
      this.$refs.itemDetail.show()
    },
    onMoveCallback (evt, originalEvent) {
      this.currentTask = evt.draggedContext.element
      this.current = +evt.to.dataset.index
    }
  }
}
</script>

<style lang='stylus'>
  @import './list.styl';
</style>
