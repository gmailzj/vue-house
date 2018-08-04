<template>
  <div>
    <h2>{{title}}</h2>
    <router-link to="/">index</router-link>

    <p>{{ message }}</p>
    <input v-model="message">
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "title",
      message: '页面加载于 ' + new Date().toLocaleString(),
    }
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },
    increment() {
      this.$store.commit('increment')
    },
    decrement() {
      this.$store.commit('decrement')
    }
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  created() {
    console.log("component2 created");
    this.$store.commit('increment');
  },
  beforeCreate: function() {
    console.log("component2 beforeBreate");
  },
  // created: function() {
  // },
  beforeMount: function() {
    console.log("component2 beforMount");
  },
  mounted: function() {
    console.log("component2 mounted");
  },
  beforeUpdate: function() {
    console.log("component2 beforeUpdate");
  },
  updated: function() {
    console.log("component2 updated");
  },
  beforeDestroy: function() {
    console.log("component2 beforeDestroy");
  },
  destroyed: function() {
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
