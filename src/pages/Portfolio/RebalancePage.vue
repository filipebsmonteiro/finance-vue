<script>
import ListSimple from "src/components/List/ListSimple.vue";
import StockItem from "src/components/Stock/StockItem.vue";
import { mapActions, mapState } from "pinia";
import { usePortfolioStore } from "src/stores/portfolio";
import { useQuotationStore } from "src/stores/quotation";
import { useREITStore } from "src/stores/reit";
import { useETFStore } from "src/stores/etf";
import { useInvestmentStore } from "src/stores/investment";
import CategoryTarget from "src/components/Investments/CategoryTarget.vue";

export default {
  components: {
    ListSimple,
    StockItem,
    CategoryTarget,
  },
  computed: {
    ...mapState(usePortfolioStore, {
      portfolioLoading: "loading",
      portfolioGroupedBySymbol: "groupedBySymbol",
    }),
    ...mapState(useQuotationStore, { quotationLoading: "loading" }),
    ...mapState(useInvestmentStore, {
      investmentLoading: "loading",
      investments: "positionCategorized",
      categories: "categories",
      userCategoryTargets: "userCategoryTargets",
    }),
    fields() {
      const options = this.categories.map((category) => ({
        value: category.code,
        label: category.label,
      }));
      return this.categories.map((category) => [
        {
          component: `q-select`,
          label: `Categoria`,
          modelValue: null,
          options,
        },
        {
          component: `q-input`,
          label: `Meta`,
          name: category.code,
          type: `number`,
          min: 0,
          modelValue: 0,
          append: { icon: "percentage" },
          filled: true,
        },
      ]);
    },
    groupedStocks() {
      return this.$groupBy(this.investments, `category`);
    },
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
      <CategoryTarget />
      <q-inner-loading :showing="investmentLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-expansion-item>

    <ListSimple
      :items="userCategoryTargets"
      emptyText="Nenhuma categoria localizada para rebalanceamento!"
      expansible
    >
      <template #header="{ item }">
        <q-item-section>
          <q-item-label caption>Categoria:</q-item-label>
          <q-item-label class="text-bold">
            {{ categories.find((c) => c.value === item.category).label }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Categoria:</q-item-label>
          <q-item-label class="text-bold"> {{ item.target }}% </q-item-label>
        </q-item-section>
      </template>

      <template #default="{ item }">
        <ListSimple
          v-if="groupedStocks[item.category]"
          :items="groupedStocks[item.category]"
          emptyText="Nenhum Investimento localizado!"
          dense
          striped
        >
          <template #default="{ item }">
            <StockItem
              :item="item"
              hide-quantity
              hide-result
              hide-quotation-change
              hide-percent-in-portfolio
            >
              <template #percentInCategory="{ percentInCategory }">
                <q-item-label>
                  Atual: {{ percentInCategory.toFixed(2).replace(`.`, `,`) }}%
                </q-item-label>
                <q-item-label>
                  Meta:
                  {{
                    (100 / groupedStocks[item.category].length)
                      .toFixed(2)
                      .replace(`.`, `,`)
                  }}%
                </q-item-label>
              </template>
            </StockItem>
          </template>
        </ListSimple>
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
