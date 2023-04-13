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
  <q-page class="flex column">
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

    <div>
      <q-inner-loading :showing="portfolioLoading || quotationLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
      <q-item
        class="q-py-none q-mt-lg text-uppercase"
        style="min-height: unset"
      >
        <q-item-section side class="text-transparent">Image</q-item-section>
        <q-item-section side>Código</q-item-section>
        <q-item-section>Nome</q-item-section>
        <q-item-section> Preço Médio</q-item-section>
        <q-item-section>Quantidade</q-item-section>
        <q-item-section>Variação Dia</q-item-section>
        <q-item-section side class="text-transparent">Opt</q-item-section>
      </q-item>
      <ListSimple
        :items="quotations"
        emptyText="Nenhum Investimento localizado!"
        expansible
      >
        <template v-slot:header="{ item }">
          <StockHeader :item="item" />
        </template>
        <template v-slot:default="{ item: { stock, close, contributions } }">
          <StockContributions :contributions="contributions" :quote="close" />
          <q-expansion-item
            expand-separator
            icon="add"
            label="Registrar outra compra"
            class="overflow-hidden rounded text-primary"
          >
            <AddStock :code="stock" />
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
