<template>
    <section>
        <p class="banner_top">
            <img src="../assets/banner_sma.jpg" alt="" />
        </p>
        <!--tab切换-->
        <div class="tab_list">
            <ul class="clearfix">
                <li @click.stop="navi(item.id)" :class="{ on: moduleName === item.id }" v-for="item in items">{{ item.title }}</li>
            </ul>
        </div>
    </section>
</template>
<script>
export default {
  name: 'navigate',
  data() {
    return {
      items: [
        { id: 'fangdai', title: '房贷计算器' },
        { id: 'shuifei', title: '税费计算器' },
        { id: 'tqhd', title: '提前还贷计算器' },
        { id: 'gjj', title: '公积金贷款额度查询' },
        { id: 'gfnl', title: '购房能力评估' },
        { id: 'zhuangxiu', title: '装修贷款计算器' }
      ],
      moduleName: ''
    };
  },
  watch: {
    $route: 'routerChange'
  },
  methods: {
    navi(id) {
      this.$router.push(id);
    },
    routerChange() {
      console.log('routerChange', this.$route);
      this.moduleName = this.$route.name;

      console.log(this.G)
    }
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tab_list ul>li {
    cursor: pointer;
}
</style>
