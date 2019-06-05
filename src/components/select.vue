<template>
  <ul class="c-select">
    <li class="option" v-for="(item, index) in list" :key="index" @click="$emit('select', item)">{{item.label}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: [Array]
    }
  }
}
</script>

<style lang='stylus'>
  @import './select.styl';
</style>
