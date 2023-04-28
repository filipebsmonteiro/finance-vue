<script>
import AddStock from "src/components/Stock/AddStock.vue";
import AddStockSheet from "src/components/Stock/AddStockSheet.vue";
import ListSimple from "src/components/List/ListSimple.vue";
import StockHeader from "src/components/Stock/StockHeader.vue";
import StockItem from "src/components/Stock/StockItem.vue";
import StockContributions from "src/components/Stock/StockContributions.vue";
import StockResume from "src/components/Stock/StockResume.vue";
import { mapActions, mapState } from "pinia";
import { usePortfolioStore } from "src/stores/portfolio";
import { useQuotationStore } from "src/stores/quotation";
import { useInvestmentStore } from "src/stores/investment";
import { useREITStore } from "src/stores/reit";
import { useETFStore } from "src/stores/etf";

export default {
  components: {
    AddStock,
    AddStockSheet,
    ListSimple,
    StockHeader,
    StockContributions,
    StockItem,
    StockResume,
  },
  computed: {
    ...mapState(usePortfolioStore, {
      portfolioLoading: "loading",
      portfolioGroupedBySymbol: "groupedBySymbol",
    }),
    ...mapState(useQuotationStore, { quotationLoading: "loading" }),
    ...mapState(useInvestmentStore, { investments: "positionCategorized" }),
  },
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    ...mapActions(usePortfolioStore, { loadPortfolio: "load" }),
    ...mapActions(useQuotationStore, { loadQuotations: "load" }),
    ...mapActions(useREITStore, { loadREITS: "load" }),
    ...mapActions(useETFStore, { loadETFS: "load" }),
  },
  async mounted() {
    await Promise.all([
      this.loadPortfolio(),
      this.loadREITS(),
      this.loadETFS(),
    ]);
    this.loadQuotations(Object.keys(this.portfolioGroupedBySymbol));
  },
};
</script>

<template>
  <q-page class="flex column">
    <q-inner-loading
      :showing="portfolioLoading || quotationLoading"
      :label="
        portfolioLoading ? `Carregando Portifolio` : `Carregando Cotações`
      "
    >
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

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

    <div class="full-width overflow-x-scroll">
      <StockHeader />
      <ListSimple
        :items="investments"
        emptyText="Nenhum Investimento localizado!"
        expansible
      >
        <template v-slot:header="{ item }">
          <StockItem
            :item="item"
            hide-percent-in-portfolio
            hide-percent-in-category
          />
        </template>
        <template v-slot:default="{ item }">
          <StockResume :stock="item" />
          <StockContributions :stock="item" />
          <q-expansion-item
            expand-separator
            icon="add"
            label="Registrar outra compra"
            class="overflow-hidden rounded text-primary"
          >
            <AddStock :code="item.code" />
          </q-expansion-item>
        </template>
      </ListSimple>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.q-expansion-item--expanded {
  // .shadow-1
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
</style>
