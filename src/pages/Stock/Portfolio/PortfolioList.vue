<script>
import AddStock from "src/pages/Stock/Portfolio/AddStock.vue";
import ListSimple from "src/components/List/ListSimple.vue";
import { mapActions, mapWritableState } from "pinia";
import { usePortfolioStore } from "src/stores/stock/portfolio";

export default {
  components: {
    AddStock,
    ListSimple,
  },
  computed: {
    ...mapWritableState(usePortfolioStore, ["list"]),
  },
  methods: {
    ...mapActions(usePortfolioStore, ["load"]),
  },
  data: () => ({
    loading: false,
    stocks: [],
  }),
  mounted() {
    this.load(true);
  },
};
</script>

<template>
  <q-page>
    <AddStock />

    <q-spinner
      v-if="loading"
      color="primary"
      size="3em"
      class="q-mt-md self-center"
    />
    <ListSimple
      v-else
      :items="list"
      emptyText="Nenhum Investimento localizado!"
      class="q-mt-md"
    >
      <template v-slot:default="{ item }">
        <q-item-section>
          <q-item-label class="column">
            <span>{{ item.code }}</span>
            <!-- <span
              :class="{
                'text-caption': true,
                'text-negative': item.quotation < item.averagePrice,
                'text-positive': item.quotation > item.averagePrice,
              }"
              >{{ $formaters.money(item.averagePrice) }}
            </span> -->
          </q-item-label>
        </q-item-section>
        <!-- <q-item-section side> </q-item-section> -->
      </template>
    </ListSimple>
  </q-page>
</template>
