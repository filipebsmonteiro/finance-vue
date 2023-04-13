<script>
import AddStock from "src/pages/Stock/Portfolio/AddStock.vue";
import ListSimple from "src/components/List/ListSimple.vue";
import StockHeader from "src/pages/Stock/Portfolio/StockHeader.vue";
import StockContributions from "src/pages/Stock/Portfolio/StockContributions.vue";
import { mapActions, mapState } from "pinia";
import { usePortfolioStore } from "src/stores/stock/portfolio";
import { useNationalQuotationStore } from "src/stores/stock/quotation/national.js";

export default {
  components: {
    AddStock,
    ListSimple,
    StockHeader,
    StockContributions,
  },
  computed: {
    ...mapState(usePortfolioStore, { portfolioLoading: "loading" }),
    ...mapState(useNationalQuotationStore, {
      quotations: "list",
      quotationLoading: "loading",
    }),
  },
  methods: {
    ...mapActions(usePortfolioStore, { loadPortfolio: "load" }),
    ...mapActions(useNationalQuotationStore, ["loadPortfolioQuotations"]),
  },
  async mounted() {
    await this.loadPortfolio(true);
    this.loadPortfolioQuotations();
  },
};
</script>

<template>
  <q-page>
    <AddStock />

    <q-spinner
      v-if="portfolioLoading || quotationLoading"
      color="primary"
      size="3em"
      class="q-mt-md self-center"
    />
    <ListSimple
      v-else
      :items="quotations"
      emptyText="Nenhum Investimento localizado!"
      class="q-mt-md"
      expansible
    >
      <template v-slot:header="{ item }">
        <StockHeader :item="item" />
      </template>
      <template v-slot:default="{ item: { close, contributions } }">
        <StockContributions :contributions="contributions" :quote="close" />
      </template>
    </ListSimple>
  </q-page>
</template>
