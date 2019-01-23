<template>
  <div class="inner-root">
    <h1>Class 与 Style 绑定</h1>
    <h2>Class 绑定</h2>
    <div>
      <div class="static"
           v-bind:class="{ active: isActive, 'text-danger': hasError }">ClassData</div>
      <button @click="isActive=!isActive;hasError=!hasError">切换</button>
      <p></p>
      <div class="static"
           v-bind:class="classObject">ClassObject</div>
      <button @click="classObject.active=!classObject.active">切换</button>

      <p>计算属性</p>
      <div v-bind:class="classObjectComputed">ClassObjectComputed</div>

      <p>数组语法</p>
      <div v-bind:class="[activeClass, errorClass]">数组语法1</div>
      <div v-bind:class="[{ active: isActive }, errorClass]">数组语法2</div>

      <p>用在组件上</p>
      <!-- template: '<p class="foo bar">Hi</p>' -->
      <my-component class="baz boo"></my-component>
      <my-component v-bind:class="{ active: isActive }"></my-component>

    </div>


    <h2>Style 绑定(内联样式)</h2>
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">内联样式</div>
    <div v-bind:style="styleObject">styleObject</div>
    <div v-bind:style="styleObjectComputed">styleObjectComputed</div>
    <div v-bind:style="[baseStyles, overridingStyles]">array</div>
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">多重值</div>
    <button>切换背景</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive:1,
        hasError: false,
        classObject: {
          active: true,
          'text-danger': false
        },
        activeClass:"active",
        activeColor: 'red',
        fontSize: 30,
        styleObject: {
          color: 'red',
          fontSize: '13px'
        },
        baseStyles:{
          color: 'red',
        },
        overridingStyles:{
          color: 'blue',
        }
      }
    },
    computed: {
      classObjectComputed: function () {
        return {
          active: this.isActive && !this.error,
          'text-danger': this.error && this.error.type === 'fatal'
        }
      },
      styleObjectComputed() {
        return {
          color: 'red',
          fontSize: '13px'
        }
      }
    }
  }
</script>

<style scoped>
.active {
  color:brown;
  background-color: #eee;
}
.text-danger{
  color:red;
}
</style>
