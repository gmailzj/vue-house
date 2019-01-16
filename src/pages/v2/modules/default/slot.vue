<template>
  <div>
    <slot-alert type="error"></slot-alert>

    <slot-alert type="success">
      <!-- 在向具名插槽提供内容的时候，我们可以在一个父组件的 template 元素上使用 slot  -->
       <template slot="header">
        <h1>Title</h1>
      </template>
      <strong>Success!</strong> Looks good to me!
    </slot-alert>
    <hr>
    <slot-alert type="warning">

      <strong>Warning!</strong> Something not good.
      <!-- 另一种 slot 特性的用法是直接用在一个普通的元素上： -->
       <p slot="footer">footer</p>
    </slot-alert>

    <slot-alert type="error">
      <strong>Error!</strong> Oooops...
    </slot-alert>
  </div>
</template>

<script>
import SlotAlert from '../common/slot';

export default {
  data() {
    return {
      a: 1
    }
  },
  components: {
    SlotAlert,
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
