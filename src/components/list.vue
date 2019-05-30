<template>
  <div class="section">
    <div id="list" class="clearfix">
      <div class="list-group" v-for="(item, index) in listData" :key="index">
        <div class="list-title">{{item.title}}
          <span class="add-item" @click="addItem(index)">+</span>
        </div>
        <draggable
          class="draggable"
          :class="{active:current===index}"
          :data-index="index"
          :move="onMoveCallback"
          :list="item.list"
          v-bind="dragOptions"
          @end="endDrag"
          @start="drag = true"
          group="people"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : null">
            <div class="draggable-item" v-for="element in item.list" :key="element.id" @click="editListItem(element)">
              <list-item :objData="element"></list-item>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
    <c-dialog
      ref="itemDetail"
      :title="listItem.id ? '编辑': '新增'"
      cancelBtn="取消"
      confirmBtn="确认"
      @confirm="itemDetailConfirm"
    >
      <div class="item-detail">
        <ul>
          <li class="dis-flex">
            <div class="w-80">概要</div>
            <div class="flex1">
              <input type="text" v-model="listItem.name">
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
            <div class="flex1">
              <select  v-model="listItem.level" id="">
                <option value="0">普通</option>
                <option value="1">紧急</option>
                <option value="2">非常紧急</option>
              </select>
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
    >
      <div class="preview-img">
        <img class="img-pre" :src="previewImg">
      </div>
    </c-dialog>
  </div>
</template>

<script>
import ListItem from './list-item'
import Draggable from 'vuedraggable'
import cDialog from './dialog'
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
    cDialog
  },
  data () {
    return {
      current: '',
      drag: false,
      groupIndex: '',
      previewImg: '',
      listItem: {
        name: '',
        description: '',
        level: 0,
        imgs: []
      }
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
  methods: {
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
    endDrag () {
      this.current = ''
      this.drag = false
      this.$store.commit(types.M_ADD_TODO_LIST_ITEM)
    },
    itemDetailConfirm () {
      this.$store.commit(types.M_ADD_TODO_LIST_ITEM, {
        index: this.groupIndex,
        item: this.listItem
      })
    },
    editListItem (item) {
      this.listItem = Object.assign({
        imgs: []
      }, item)
      this.$refs.itemDetail.show()
    },
    addItem (index) {
      this.groupIndex = index
      this.listItem = {
        name: '',
        description: '',
        level: 0,
        imgs: []
      }
      this.$refs.itemDetail.show()
    },
    onMoveCallback (evt, originalEvent) {
      this.current = +evt.to.parentElement.dataset.index
    }
  }
}
</script>

<style lang='stylus'>
  @import './list.styl';
</style>
