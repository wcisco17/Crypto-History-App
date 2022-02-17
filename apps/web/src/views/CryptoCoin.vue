<template>
  <div v-if="loading">Loading...</div>

  <div v-if="data != null || error == null" v-for="item in data">
    <h1>ID: {{ item.id }}</h1>
    <p>Name: {{ item.name }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      loading: false,
      data: [],
      error: null
    };
  },

  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      { immediate: true }
    );
  },

  methods: {
    async fetchData() {
      this.error = this.data = null;
      this.loading = true;

      try {
        this.loading = false;
        const data = await fetch(`https://api.nomics.com/v1/currencies?key=a4f4a74fa0b4889dda17de1b1829c6374d9f506b&ids=${this.$route.params.coin}&attributes=id,name`, { method: "get" });

        this.data = await data.json();
      } catch (e) {
        this.loading = false;
        this.error = `Error ${e}`;
      }
    }
  }
});
</script>