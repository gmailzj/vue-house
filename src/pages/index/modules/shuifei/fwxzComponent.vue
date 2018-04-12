<template>
  <ul class="option">
    <li v-for="item in items" @click="fill(item)">{{item.text}}</li>
  </ul>
</template>
<script>
export default {
  name: 'fwxzComponent',
  data() {
    let items = [
      {text:'普通住宅', val:1},
      {text:'非普通住宅', val:2},
      {text:'经济适用房', val:3}
    ];
    return {
      items:items,
      fill(obj) {
        this.$emit('fw-msg', obj)
      }
    }
  }
}
</script>
<style>

</style>
