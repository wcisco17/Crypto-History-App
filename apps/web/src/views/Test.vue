<template lang="html">
  <div>Hello from test file page... {{ name }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      name: 'Will'
    }
  }
})

</script>