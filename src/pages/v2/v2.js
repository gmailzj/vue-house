import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store';

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

// 设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪
// 只适用于开发模式和支持 performance.mark API 的浏览器上
Vue.config.performance = true;
// 指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例
Vue.config.errorHandler = function(err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
};

// 为 Vue 的运行时警告赋予一个自定义处理函数。注意这只会在开发者环境下生效，在生产环境下它会被忽略。
Vue.config.warnHandler = function(msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
};

// 须使 Vue 忽略在 Vue 之外的自定义元素 (e.g. 使用了 Web Components APIs)
Vue.config.ignoredElements = [
  "my-custom-web-component",
  "another-web-component",
  // 用一个 `RegExp` 忽略所有“ion-”开头的元素
  // 仅在 2.5+ 支持
  /^ion-/
];

// 可以通过全局 config.keyCodes 对象自定义按键修饰符别名
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
};
Vue.config.keyCodes.f1 = 112;

// 定义一个名为 button-counter 的新组件
Vue.component("button-counter", {
  data: function() {
    return {
      count: 0
    };
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

// 定义全局组件
Vue.component("mycomponent", {
  template: `<div>这是一个自定义组件</div>`,
  data() {
    return {
      message: "hello world"
    };
  }
});

/* eslint-disable no-new */
// new Vue({ el: "#components-demo" });

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {
    App
  },
  beforeCreate: function() {
    console.log("vm beforeBreate");
  },
  created: function() {
    console.log("vm created");
  },
  beforeMount: function() {
    console.log("vm beforMount");
  },
  mounted: function() {
    console.log("vm mounted");
  },
  beforeUpdate: function() {
    console.log("vm beforeUpdate");
  },
  updated: function() {
    console.log("vm updated");
  },
  beforeDestroy: function() {
    // `this` 指向 vm 实例
    console.log("vm beforeDestroy");
  },
  destroyed: function() {
    // `this` 指向 vm 实例
    console.log("vm destroyed");
  }
});
