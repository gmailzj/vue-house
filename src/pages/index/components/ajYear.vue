<template>
  <ul class="option" style="height:200px;overflow-y: auto">
    <li v-for="item in items" @click="fill(item)">{{item.text}}</li>
  </ul>
</template>
<script>
export default {
  name: 'ajYear',
  props:['showYear'],
  data() {
    let items = [];
    let number = this.G.city === 'bj' ? 25 : 30;
    for (let i = number; i >= 1 ; i--) {
      items.push({
        text: i + '年（' + i * 12 + '期）',
        val: i
      })
    }
    return {
      items: items
    }
  },
  methods: {
    fill(obj) {
      this.$emit('year-msg', obj)
    }
  }
}
</script>
<style>

</style>
