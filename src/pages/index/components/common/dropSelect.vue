/**
 * @file 下拉菜单
 * @author fenglinzeng@fang.com
 * @usage:
 * selectItem => 菜单列表传入Array，其中单项为对象。显示单项的name，返回单项的整个对象。
 * klass => 传入的样式class，放置于父级
 * name => 用于选中单项时，返回对应的name给父级以区分选中项
 * defaultItem => 默认显示的单项
 */

<template>
    <div class="clearfix" :class="klass">
        <p class="select" @click="toggleDrop">
            <input type="" :value="defaultItem.name || selectItem[0].name" name="" readonly="readonly" />
            <i></i>
        </p>
        <ul class="option" :class="classObj">
            <li v-for="item in selectItem" @click="selectDrop(item)">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'dropSelect',
  props: {
    selectItem: {
      type: Array,
      default: [],
      required: true
    },
    klass: {
      type: String,
      default: '',
      required: false
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    defaultItem: {
      type: Object,
      default: function() {
        return {
          name: '',
          value: ''
        }
      },
      required: true
    }
  },
  data() {
    return {
      classObj: {
        option: true,
        none: true
      }
    }
  },
  methods: {
    // 点击别处时隐藏
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.classObj.none = true;
      }
    },
    // 显示或隐藏下拉菜单
    toggleDrop() {
      this.classObj.none = !this.classObj.none;
    },
    // 选择的下拉菜单
    selectDrop(item) {
      this.$emit('selectDrop', item, this.name);
      this.toggleDrop();
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('click', this.close);
    });
  },
  beforeDestroy() {
    window.removeEventListener('click', this.close);
  }
}
</script>
<style scoped>
ul.option {
    max-height: 250px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
