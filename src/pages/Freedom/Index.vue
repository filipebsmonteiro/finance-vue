<template>
  <q-page>
    <FreedomHeader
      class="q-mt-md q-mx-auto"
      v-model:show-chart="showChart"
      v-model:show-card="showCard"
      v-model:show-simulator="showSimulator"
    />

    <div v-if="showSimulator" class="row">
      <div class="col-12 col-md-6 offset-md-3 q-mt-md">
        <Simulator />
      </div>
    </div>

    <LineChart
      v-if="showChart"
      class="q-ma-md"
      :chart-data="{ labels, datasets }"
      :chart-options="{ responsive: true, maintainAspectRatio: false }"
    />

    <ListSimple v-if="showCard" :items="years" expansible class="flex wrap">
      <template v-slot:header="{ item: { year, patrimony } }">
        <q-item-section>
          <q-item-label>{{ year }}</q-item-label>
          <q-item-label caption>
            Acumulado: {{ $formaters.money(patrimony) }}
          </q-item-label>
        </q-item-section>
      </template>

      <template v-slot:default="{ item: { months } }">
        <q-table
          flat
          class="q-ma-md"
          :columns="monthColumns"
          :rows="months"
          hide-pagination
          :rows-per-page-options="[0]"
        />
      </template>
    </ListSimple>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProjectionStore } from "src/stores/projection";
import { useBalanceStore } from "src/stores/balance";
import LineChart from "src/components/Charts/Line.vue";
import ListSimple from "src/components/List/ListSimple.vue";
import FreedomHeader from "src/pages/Freedom/Header.vue";
import Simulator from "src/pages/Freedom/Simulator.vue";

export default {
  name: "PageIndex",
  components: { ListSimple, FreedomHeader, LineChart, Simulator },
  computed: {
    ...mapState(useProjectionStore, ["list", "inflation", "investment"]),
    ...mapState(useBalanceStore, ["getTotal", "getTotalCosts"]),
    years() {
      const yearsGrouped = this.$groupBy(this.list, "year");
      let years = [];

      for (const year in yearsGrouped) {
        if (Object.hasOwnProperty.call(yearsGrouped, year)) {
          let element = yearsGrouped[year];
          years.push({
            year,
            patrimony: element[element.length - 1].patrimony,
            months: element,
            classes: "card-projection",
          });
        }
      }

      return years;
    },
    labels() {
      return this.list.map((l) => `${l.month}/${l.year}`);
    },
    datasets() {
      return [
        {
          label: "Custos com Inflação",
          backgroundColor: "#f87979",
          data: this.list.map((l) => l.costWithInflation),
        },
        {
          label: "Renda Investimentos",
          backgroundColor: "#7acbf9",
          data: this.list.map((l) => l.investimentIncome),
        },
      ];
    },
  },
  data() {
    return {
      showChart: true,
      showCard: false,
      showSimulator: true,
      monthColumns: [
        {
          name: "month",
          field: "month",
          label: "Mês",
          align: "left",
        },
        {
          name: "patrimony",
          field: "patrimony",
          label: "Acumulado",
          format: this.$formaters.money,
        },
        {
          name: "investimentIncome",
          field: "investimentIncome",
          label: "Renda Passiva",
          // align: "right",
          format: this.$formaters.money,
        },
      ],
    };
  },
  methods: {
    ...mapActions(useBalanceStore, ["load"]),
    ...mapActions(useProjectionStore, ["reset"]),
  },
  async mounted() {
    this.load();
    this.reset();
  },
};
</script>
