<template>
  <div>
    <slot-alert type="error">error</slot-alert>
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
