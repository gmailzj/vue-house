<template>
  <div>
    <h2>{{title}}</h2>
    <router-link to="/">index</router-link>

    <p>{{ message }}</p>
    <input v-model="message">
    <p>state.count:</p>
    <p>{{ count }}</p>
    <p>subCount: {{sumWithRootCount}}</p>
    <p>{{ subCount }} ---  {{sumWithRootCountComputed}}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="loadData">loadData</button>
      <button @click="login">login</button>
      <button @click="modules">modules</button>
    </p>
    <p>{{ content }}</p>
    <p>用户：</p>
    <p>{{userInfo.id}}</p>
    <p>{{userInfo.nickname}}</p>
    <br/>
    <p>token:</p>
    <p>{{userInfo.id}}</p>
    <p>doneTodos:</p>
    <p>{{doneTodos}}</p>
    <p>doneTodosCount:</p>
    <p>{{doneTodosCount}}</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import model from "@/model/admin";

export default {
  data() {
    return {
      title: "vuex",
      message: '页面加载于 ' + new Date().toLocaleString(),
      content: null
    }
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },
    increment() {
      // this.$store.dispatch('increment')

      // 以载荷形式分发
      this.$store.dispatch('incrementAsync', {
        amount: 1
      })
      this.$store.dispatch('moduleA/increment')
    },
    decrement() {
      // this.$store.commit('decrement')
      // 以对象形式分发
      this.$store.dispatch({
        type: 'decrement',
        amount: 1
      })
    },
    loadData() {
      console.log(this.userInfo);
      let id = 1;
      var vm = this;
      model.getItem(null, id)
        .then((ret) => {
          console.log(ret.data);
          vm.content = ret.data.data.title;
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    login() {
      model.login(null)
        .then((ret) => {
          console.log(ret.data);
          this.$store.commit("SET_TOKEN", ret.data.data.token);
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
    modules() {
      console.log('clicked');
      console.log(this.$store.state)
      console.log(this.$store.state.a)
      // this.$store.dispatch('increment')
    }
  },
  computed: {
    // 数组形式
    ...mapGetters(["userInfo", "doneTodos", "doneTodosCount", "moduleA/sumWithRootCount"]),
    // 如果你想将一个 getter 属性另取一个名字，使用对象形式
    ...mapGetters({ sumWithRootCount: "moduleA/sumWithRootCount" }),
    count() {
      return this.$store.state.count;
    },
    subCount() {
      return this.$store.state.moduleA.count;
    },
    sumWithRootCountComputed() {
      return this['moduleA/sumWithRootCount'];
    }
  },
  mounted: function () {
    console.log(this.$store.state.userInfo);
    if (!this.$store.state.userInfo) {
      // this.$store.dispatch("getUserInfo")
      this.$store.dispatch("getUserInfo").then((ret) => {
        console.log("ret:", ret);
        console.log('getUserInfo dispatch');
      });
    }

    console.log("component2 mounted");
  },
  created() {
    console.log("component2 created");
    // this.$store.commit('increment');
  },
  beforeCreate: function () {
    console.log("component2 beforeBreate");
  },
  // created: function() {
  // },
  beforeMount: function () {
    console.log("component2 beforMount");
  },

  beforeUpdate: function () {
    console.log("component2 beforeUpdate");
  },
  updated: function () {
    console.log("component2 updated");
  },
  beforeDestroy: function () {
    console.log("component2 beforeDestroy");
  },
  destroyed: function () {
    console.log("component2 destroyed");
  }

}
</script>
<style>
input {
  width: 260px;
  display: block;
  padding: 0.6em 0.8em;
  border: 1px dashed #ccc;
  background-color: #f5f5f5;
  color: #000;
  font-family: Monaco, monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
button {
  border:1px solid #eee;
}
</style>
