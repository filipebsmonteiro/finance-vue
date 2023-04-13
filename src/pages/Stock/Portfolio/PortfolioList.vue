<script>
import AddStock from "src/pages/Stock/Portfolio/AddStock.vue";
import AddStockSheet from "src/pages/Stock/Portfolio/AddStockSheet.vue";
import ListSimple from "src/components/List/ListSimple.vue";
import StockHeader from "src/pages/Stock/Portfolio/StockHeader.vue";
import StockContributions from "src/pages/Stock/Portfolio/StockContributions.vue";
import { mapActions, mapState } from "pinia";
import { usePortfolioStore } from "src/stores/stock/portfolio";
import { useNationalQuotationStore } from "src/stores/stock/quotation/national";

export default {
  components: {
    AddStock,
    ListSimple,
    StockHeader,
    StockContributions,
    AddStockSheet,
  },
  computed: {
    ...mapState(usePortfolioStore, {
      portfolioList: "list",
      portfolioLoading: "loading",
    }),
    ...mapState(useNationalQuotationStore, {
      quotations: "list",
      quotationLoading: "loading",
    }),
  },
  data() {
    return {
      tab: null,
    };
  },
  watch: {
    portfolioList() {
      this.loadPortfolioQuotations();
    },
  },
  methods: {
    ...mapActions(usePortfolioStore, { loadPortfolio: "load" }),
    ...mapActions(useNationalQuotationStore, ["loadPortfolioQuotations"]),
  },
  async mounted() {
    this.loadPortfolio();
  },
};
</script>

<template>
  <q-page>
    <q-expansion-item
      expand-separator
      icon="add"
      label="Adicionar Compra(s)"
      class="overflow-hidden rounded"
    >
      <q-tabs v-model="tab" align="left">
        <q-tab name="manual" label="Manual" />
        <q-tab name="sheet" label="Tabela" />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="slide-down"
        transition-next="slide-up"
      >
        <q-tab-panel name="manual" class="q-pa-none">
          <AddStock />
        </q-tab-panel>

        <q-tab-panel name="sheet" class="q-pa-none">
          <AddStockSheet />
        </q-tab-panel>
      </q-tab-panels>
    </q-expansion-item>

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

<style lang="scss" scoped>
.q-expansion-item--expanded {
  // .shadow-1
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
</style>
