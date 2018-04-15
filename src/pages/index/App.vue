<template>
  <div>
    <!-- <naviWeb></naviWeb> -->
    <div class="counter main_1000 clearfix">
      <navigate></navigate>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  // import naviWeb from './components/navi-web.vue';
  import navigate from '@/pages/index/components/navigate.vue';

  require('@/pages/index/assets/style.css');

  export default {
    name: 'app',
    data() {
      return {};
    },
    watch: {

    },
    methods: {

    },
    components: {
      navigate
      // naviWeb
    },
    // mounted(){
    //   console.log('mounted', this.$route);
    // },
    // updated(){
    //   this.moduleName = this.$route.name;
    //   console.log('updated', this.$route);
    // }
  }
</script>
<style>
</style>
