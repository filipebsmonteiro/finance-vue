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
    userCategoriesParsed() {
      if (this.investments.length > 0 && this.userCategoryTargets.length > 0) {
        const groupedInvestments = this.$groupBy(this.investments, `category`);
        const portfolioTotal = this.aportValue > 0
          ? parseFloat(this.aportValue) + this.investments.reduce((a, c) => a + c.amount.actual, 0)
          : this.investments.reduce((a, c) => a + c.amount.actual, 0);

        return this.userCategoryTargets.map(userTarget => {
          const categoryTotal = groupedInvestments[userTarget.category]
            ? groupedInvestments[userTarget.category].reduce((a, c) => a + c.amount.actual, 0)
            : 0;
          return {
            code: userTarget.category,
            label: this.categories.find((c) => c.value === userTarget.category).label,
            investments: groupedInvestments[userTarget.category],
            target: {
              percent: userTarget.target,
              value: userTarget.target * portfolioTotal / 100,
            },
            actual: {
              percent: categoryTotal * 100 / portfolioTotal,
              value: categoryTotal,
            }
          }
        });
      }
      return [];
    }
  },
  data() {
    return {
      aportValue: 0,
      investmentsSection: [
        {
          key: `logo`,
          side: true,
          img: {
            src: (item) => item.logo,
          },
        },
        {
          key: `code`,
          side: true,
        },
        {
          key: `name`,
          class: `col`,
          side: true,
          // hide: this.$q.screen.lt.md,
        },
        {
          key: `percentInCategory`,
          label: {
            caption: true,
            format: (percentInCategory) =>
              `${percentInCategory.toFixed(2).replace(`.`, `,`)}% na categoria`,
          },
        },
        {
          key: `percentInPortfolio`,
          label: {
            caption: true,
            format: (percentInPortfolio) =>
              `${percentInPortfolio.toFixed(2).replace(`.`, `,`)}% na carteira`,
          },
        },
      ],
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
  <q-page>
    <q-expansion-item icon="la la-bullseye" label="Definir alvos" class="overflow-hidden rounded q-mb-md col">
      <CategoryTarget />
      <q-inner-loading :showing="investmentLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-expansion-item>
    <q-input v-model="aportValue" type="number" min="0" label="Valor a aportar" class="q-px-xl q-pb-lg">
      <template v-slot:prepend>R$</template>
    </q-input>

    <ListSimple :items="userCategoriesParsed" emptyText="Nenhuma categoria localizada para rebalanceamento!" expansible>
      <template #header="{ item }">
        <q-item-section>
          <q-item-label caption>Categoria:</q-item-label>
          <q-item-label class="text-bold" lines="1">
            {{ item.label }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Porcentagem:</q-item-label>
          <q-item-label class="text-black" caption>
            <span class="text-bold">Atual: </span>{{ item.actual.percent.toFixed(2).replace(`.`, `,`) }}%<br>
            <span class="text-bold">Alvo: </span>{{ item.target.percent.replace(`.`, `,`) }}%
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Valor Atualizado:</q-item-label>
          <q-item-label class="text-black" caption>
            <span class="text-bold">Atual: </span>{{ $formaters.money(item.actual.value) }}<br>
            <span class="text-bold">Alvo: </span>{{ $formaters.money(item.target.value) }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Valor a Aportar:</q-item-label>
          <q-item-label class="text-bold">
            {{ $formaters.money(item.target.value - item.actual.value) }}
          </q-item-label>
        </q-item-section>
      </template>

      <template #default="{ item }">
        <ListSimple v-if="item.investments" :items="item.investments" emptyText="Nenhum Investimento localizado!" dense
          striped>
          <template #default="{ item }">
            <StockItem :item="item" :sections="investmentsSection" />
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
