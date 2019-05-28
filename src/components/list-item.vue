<template>
  <div class="item" :class="'level level' + objData.level">
    <span>{{objData.name}}</span>
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
