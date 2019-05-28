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
      listItem: {
        name: '',
        description: '',
        level: 0
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
      this.listItem = Object.assign({}, item)
      this.$refs.itemDetail.show()
    },
    addItem (index) {
      this.groupIndex = index
      this.listItem = {
        name: '',
        description: '',
        level: 0
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
