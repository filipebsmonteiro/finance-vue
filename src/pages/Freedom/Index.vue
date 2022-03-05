<template>
  <q-page>
    <Header />

    <Simple :items="years" expansible>
      <template v-slot:header="{ item }">
        <q-item-section>
          <q-item-label>
            {{ item.label }}
          </q-item-label>
          <q-item-label caption>
            Acumulado: {{ $formaters.money(item.balance) }}
          </q-item-label>
        </q-item-section>
      </template>

      <template v-slot:default="{ item }">
        <q-table
          class="q-ma-md"
          :columns="monthColumns"
          :rows="item.months"
          hide-pagination
          :rows-per-page-options="[0]"
        />
      </template>
    </Simple>
  </q-page>
</template>

<script>
import Simple from "src/components/List/Simple.vue";
import { date } from "quasar";
import { mapGetters } from "vuex";
import Header from "./Header.vue";

export default {
  components: { Simple, Header },
  computed: {
    ...mapGetters({
      monthQuantity: "projection/monthQuantity",
      inflation: "projection/inflation",
      investment: "projection/investment",
      balance: "balance/monthlyBalance",
    }),
    months() {
      const start = date.buildDate(Date.now());
      const final = date.addToDate(Date.now(), { months: this.monthQuantity });
      let balanceAccumulator = 0;

      let dates = this.$getDateArrayByMonths(start, final);
      dates = dates.map((m) => {
        balanceAccumulator += this.balance;
        return {
          month: date.formatDate(m, "MMMM"),
          year: date.formatDate(m, "YYYY"),
          balance: balanceAccumulator,
          investment:
            balanceAccumulator * ((this.investment - this.inflation) / 100),
        };
      });
      return dates;
    },
    years() {
      const yearsGrouped = this.$groupBy(this.months, "year");
      let years = [];

      for (const year in yearsGrouped) {
        if (Object.hasOwnProperty.call(yearsGrouped, year)) {
          let element = yearsGrouped[year];
          years.push({
            label: year,
            balance: element[element.length - 1].balance,
            months: element,
          });
        }
      }

      return years;
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
          name: "balance",
          field: "balance",
          label: "Acumulado",
          format: this.$formaters.money,
        },
        ,
        {
          name: "investment",
          field: "investment",
          label: "Renda Passiva",
          // align: "right",
          format: this.$formaters.money,
        },
      ],
    };
  },
};
</script>
