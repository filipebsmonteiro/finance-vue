<script>
import ListSimple from "src/components/List/ListSimple.vue";
import StockItem from "src/components/Stock/StockItem.vue";
import { mapActions, mapState } from "pinia";
import { usePortfolioStore } from "src/stores/portfolio";
import { useNationalQuotationStore } from "src/stores/stock/national";
import InputList from "src/components/InputList.vue";

export default {
  components: {
    ListSimple,
    StockItem,
    InputList,
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
    fields() {
      return this.categories.map((category) => [
        {
          component: `q-input`,
          label: `Categoria`,
          modelValue: category,
          readonly: true,
          filled: true,
        },
        {
          component: `q-input`,
          label: `Meta`,
          name: category,
          type: `number`,
          min: 0,
          modelValue: 0,
          filled: true,
        },
      ]);
    },
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
  <ul>
    <li>
      Criar uma tabela de portifolio targets no firebase
      <ul>
        <li>
          Acrescentar o id do cara , e os dados serão: Categoria e valor
          percentual
        </li>
        <li>Pra cada categoria organizar esse expaned aqui embaixo</li>
        <li>OrderBy items por categoria</li>
        <li>Acrescentar nos items campo quanto tem de vender ou comprar</li>
      </ul>
    </li>
  </ul>
  <q-page class="flex column">
    <q-expansion-item
      icon="la la-bullseye"
      label="Definir alvos"
      class="overflow-hidden rounded q-mb-md"
    >
      <InputList :list="fields" hide-add-line hide-delete-line />
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
