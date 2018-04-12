<template>
  <ul class="option" style="height:200px;overflow-y: auto">
    <li v-for="item in items" @click="fill(item)">{{item.text}}</li>
  </ul>
</template>
<script>
export default {
  name: 'ajFew',
  data() {
    return {
      // 按揭成数
      items:[
        {text:'8成', val:8},
        {text:'7.5成', val:7.5},
        {text:'7成', val:7},
        {text:'6.5成', val:6.5},
        {text:'6成', val:6},
        {text:'5.5成', val:5.5},
        {text:'5成', val:5},
        {text:'4.5成', val:4.5},
        {text:'4成', val:4},
        {text:'3.5成', val:3.5},
        {text:'3成', val:3},
        {text:'2.5成', val:2.5},
        {text:'2成', val:2}
      ]
    }
  },
  methods:{
    fill(obj) {
      this.$emit('few-msg', obj);
    }
  }
}
</script>
<style>

</style>
