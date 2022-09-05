<template>
  <q-page>
    <FreedomHeader class="w-50 q-mt-md q-mx-auto" />

    <LineChart class="q-ma-md" :labels="labels" :datasets="datasets" />

    <!--ListSimple :items="years" expansible>
      <template v-slot:header="{ item: { year, capital } }">
        <q-item-section>
          <q-item-label>{{ year }}</q-item-label>
          <q-item-label caption>
            Acumulado: {{ $formaters.money(capital) }}
          </q-item-label>
        </q-item-section>
      </template>

      <template v-slot:default="{ item: { months } }">
        <q-table
          class="q-ma-md"
          :columns="monthColumns"
          :rows="months"
          hide-pagination
          :rows-per-page-options="[0]"
        />
      </template>
    </ListSimple-->
  </q-page>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useProjectionStore } from "src/stores/projection";
import { useBalanceStore } from "src/stores/balance";
import LineChart from "src/components/Charts/Line.vue";
// import ListSimple from "src/components/List/ListSimple.vue";
import FreedomHeader from "./Header.vue";

export default {
  name: "PageIndex",
  // components: { ListSimple, FreedomHeader, LineChart },
  components: { FreedomHeader, LineChart },
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
            capital: element[element.length - 1].capital,
            months: element,
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
      monthColumns: [
        {
          name: "month",
          field: "month",
          label: "Mês",
          align: "left",
        },
        {
          name: "capital",
          field: "capital",
          label: "Acumulado",
          format: this.$formaters.money,
        },
        ,
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
  },
  mounted() {
    this.load();
  },
};
</script>
