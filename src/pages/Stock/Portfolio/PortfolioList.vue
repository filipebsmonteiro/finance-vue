<script>
import AddStock from "src/pages/Stock/Portfolio/AddStock.vue";
import ListSimple from "src/components/List/ListSimple.vue";
import { mapActions, mapState } from "pinia";
import { usePortfolioStore } from "src/stores/stock/portfolio";
import { useNationalQuotationStore } from "src/stores/stock/quotation/national";

export default {
  components: {
    AddStock,
    ListSimple,
  },
  computed: {
    ...mapState(usePortfolioStore, {
      portfolio: "list",
      portfolioLoading: "loading",
    }),
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
    >
      <template v-slot:default="{ item }">
        <q-item-section side>
          <q-avatar size="40px">
            <img :src="item.logo" />
          </q-avatar>
        </q-item-section>
        <q-item-section side>{{ item.stock }}</q-item-section>
        <q-item-section>{{ item.name }}</q-item-section>
        <q-item-section>
          <q-item-label>
            <span
              :class="{
                'text-caption': true,
                'text-positive': item.change > 0,
                'text-negative': item.change < 0,
              }"
              >{{ $formaters.money(item.close) }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-badge
              rounded
              :color="item.change > 0 ? 'positive' : 'negative'"
              @click="double(`patrimony`)"
            >
              <q-icon
                :name="item.change > 0 ? 'la la-arrow-up' : 'la la-arrow-down'"
              />
              {{ parseFloat(item.change).toFixed(2) }}%
            </q-badge>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-fab padding="xs" />
        </q-item-section>
      </template>
    </ListSimple>
  </q-page>
</template>
