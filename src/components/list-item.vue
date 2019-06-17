<template>
  <div class="item" :class="'level level' + objData.level">
    <span>{{objData.title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    objData: {
      type: [Object],
      default: () => {}
    }
  }
}
</script>

<style lang='stylus'>
  @import './list-item.styl';
</style>
