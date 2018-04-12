<template>
  <ul class="option" style="height:150px;overflow-x:hidden;overflow-y: auto">
    <li v-for="item in items" @click="fill(item)">{{item.text}}</li>
  </ul>
</template>
<script>
export default {
  name: 'ajRate',
  data() {
    return {
      items: [
        {text: '基准利率', val: '1'},
        {text: '7折', val: '0.7'},
        {text: '85折', val: '0.85'},
        {text: '88折', val: '0.88'},
        {text: '9折', val: '0.9'},
        {text: '95折', val: '0.95'},
        {text: '1.1倍', val: '1.1'},
        {text: '1.2倍', val: '1.2'},
        {text: '1.3倍', val: '1.3'}
      ]
    }
  },
  methods:{
    fill: function(obj) {
      this.$emit('rate-msg', obj);
    }
  }
}
</script>
<style>

</style>
