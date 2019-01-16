<template>
  <div :class="alertClasses" v-show="show">
    <!-- 必须包含一个 <slot> 元素，则任何传入它的内容都会被抛弃。 -->
    <header>
    <!-- <slot> 元素有一个特殊的特性：name -->
    <slot name="header"></slot>
    </header>>

    <slot><strong>Default!</strong> Hello World~</slot>
    <span class="Alert__close" @click="show = false">x</span>

    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: true
    }
  },
  props: ['type'],
  methods: {
  },
  computed: {
    alertClasses: function () {
      return {
        'Alert--Success': this.type === 'success',
        'Alert--Warning': this.type === 'warning',
        'Alert--Error'  : this.type === 'error'
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
  .Alert__close {
    font-weight: bold;
    cursor: pointer;
  }
  .Alert--Success {
    color: green;
  }
  .Alert--Warning {
    color: #aa0;
  }
  .Alert--Error {
    color: red;
  }
</style>
