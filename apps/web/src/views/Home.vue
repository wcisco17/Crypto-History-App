<template lang="html">
  <h2>Home page...</h2>

  <div v-if="currencies.loading">
    Loading...
  </div>

  <div v-if="currencies.error != null">
    Error! {{ JSON.stringify(currencies.error) }}
  </div>

  <div v-if="currencies.data !== null && !(currencies.loading)" v-for="item in currencies.data">
    <div @click="navigateToCryptoCoin(item.id)">
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

type ICurrencies = {
  id: string;
  name: string;
}

type IState = {
  loading: boolean;
  error?: null | string;
  data: ICurrencies[] | null;
}

export default defineComponent({
  setup() {
    const state = reactive({
      currencies: {
        loading: false,
        error: null,
        data: []
      } as IState
    });

    async function getCurrencies() {
      const { currencies } = state;
      currencies.loading = true;

      try {
        const coinbaseCurrencies = await fetch(
          `https://api.nomics.com/v1/currencies?key=a4f4a74fa0b4889dda17de1b1829c6374d9f506b&ids=BTC,ETH,XRP&attributes=id,name`, {
            method: 'get',
            credentials: 'same-origin'

          });

        let data = await coinbaseCurrencies.json();

        if (data.length > 1) {
          currencies.data = (data as ICurrencies[]);
          currencies.loading = false;
        }

      } catch (e) {
        currencies.loading = false;
        currencies.error = `Error when fetching api: ${e}`;
      }
    }

    return { getCurrencies, currencies: state.currencies };
  },

  methods: {
    navigateToCryptoCoin(id: string) {
      let TIMESERIES = 121323223;
      return this.$router.push(`/c/${id}/t/${TIMESERIES}`);
    }
  },

  mounted() {
    this.getCurrencies();
  }
});
</script>