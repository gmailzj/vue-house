<template>
  <li>
    <span v-if="showImportant"><b>*</b>{{title}}：</span>
    <span v-else>{{title}}：</span>
    <span v-for="item in items" @click="fill(item)" class="fangshi"><i v-bind:class="item.cla"></i>{{item.text}}</span>
  </li>
</template>
<script>
export default {
  name: 'SelectComponent',
  props:['title', 'items', 'showImportant'],
  data() {
    return {
      fill(obj) {
        this.items.forEach(function(value, inx, array) {
          array[inx].cla = '';
        });
        obj.cla = 'on';
        this.$emit('select-msg', obj);
      }
    }
  }
}
</script>
<style>

</style>
