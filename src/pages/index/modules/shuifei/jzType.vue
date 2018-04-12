<template>
  <ul class="option">
    <li v-for="item in items" @click="fill(item)">{{item.text}}</li>
  </ul>
</template>
<script>
export default {
  name: 'jzType',
  data() {
    let items = [
      {text:'总价', val:1},
      {text:'差价', val:2}
    ];
    return {
      items:items,
      fill(obj) {
        this.$emit('jztype-msg', obj)
      }
    }
  }
}
</script>
<style>

</style>
