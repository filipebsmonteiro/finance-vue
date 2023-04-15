<script>
import ListSimple from "src/components/List/ListSimple.vue";
import StockItem from "src/components/Stock/StockItem.vue";
import { mapActions, mapState } from "pinia";
import { usePortfolioStore } from "src/stores/stock/portfolio";
import { useNationalQuotationStore } from "src/stores/stock/quotation/national";

export default {
  components: {
    ListSimple,
    StockItem,
  },
  computed: {
    ...mapState(usePortfolioStore, {
      portfolioList: "list",
      portfolioLoading: "loading",
    }),
    ...mapState(useNationalQuotationStore, {
      categories: "categories",
      quotations: "list",
      quotationLoading: "loading",
    }),
  },
  // data() {
  //   return {
  //     tab: null,
  //   };
  // },
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
      icon="la la-bullseye"
      label="Definir alvos"
      class="overflow-hidden rounded q-mb-md"
    >
      <div class="q-pa-md">
        <q-input
          v-for="category in categories"
          :key="category"
          :label="category"
          type="number"
          model-value="0"
          filled
        />
      </div>
    </q-expansion-item>

    <div class="full-width overflow-x-scroll">
      <q-inner-loading :showing="portfolioLoading || quotationLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>

      <ListSimple
        :items="quotations"
        emptyText="Nenhum Investimento localizado!"
      >
        <template v-slot:default="{ item }">
          <StockItem
            :item="item"
            hide-quantity
            hide-result
            hide-quotation-change
          />
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
