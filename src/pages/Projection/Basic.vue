<template>
  <q-page>
    <q-input v-model="month.quantity" label="Meses" min="0">
      <template v-slot:prepend>
        <q-btn flat rounded icon="remove" @click="month.quantity--" />
      </template>
      <template v-slot:append>
        <q-btn flat rounded icon="add" @click="month.quantity++" />
      </template>
    </q-input>

    <Simple :items="projections" expansible>
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
          :columns="month.columns"
          :rows="item.months"
          hide-pagination
          :rows-per-page-options="[0]"
        />
      </template>
    </Simple>
  </q-page>
</template>

<script>
import { date } from "quasar";
import Simple from "src/components/List/Simple.vue";

export default {
  components: { Simple },
  computed: {
    projections() {
      const yearsGrouped = this.$groupBy(this.months, "year");
      let years = [];

      for (const year in yearsGrouped) {
        if (Object.hasOwnProperty.call(yearsGrouped, year)) {
          let element = yearsGrouped[year];
          years.push({
            label: year,
            balance: element[element.length - 1].balance,
            // classes: "flex justify-between items-center",
            months: element,
          });
        }
      }

      return years;
    },
    months() {
      const now = date.buildDate(Date.now());
      const final = date.addToDate(now, { months: this.month.quantity });
      let months = [];
      let balanceAccumulator = 0;

      for (
        let d = now;
        !date.isSameDate(d, final, "month");
        d = date.addToDate(d, { months: 1 })
      ) {
        balanceAccumulator += this.month.balance;
        // date.formatDate(new Date(d), "YYYY-MM-DDTHH:mm:ss.SSSZ")
        months.push({
          month: date.formatDate(new Date(d), "MMMM YYYY"),
          year: date.formatDate(new Date(d), "YYYY"),
          balance: balanceAccumulator,
        });
      }
      return months;
    },
  },
  data() {
    return {
      month: {
        balance: 0,
        quantity: 24,
        columns: [
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
            // align: "right",
            format: this.$formaters.money,
          },
        ],
      },
      final_date: null,
    };
  },
  mounted() {
    let balances = this.$q.localStorage.getItem(
      this.$CONST.localStorage.FINANCE.BALANCES
    );

    if (balances && balances.length > 0) {
      const incomesSum = balances
        .filter((b) => b.type === "income")
        .reduce((a, c) => a + parseFloat(c.value), 0);

      const expensesSum = balances
        .filter((b) => b.type === "expense")
        .reduce((a, c) => a + parseFloat(c.value), 0);
      this.month.balance = incomesSum - expensesSum;

      if (this.month.balance <= 0) {
        this.$q.notify({
          type: "negative",
          message:
            "Seus ganhos são menores que suas dívidas! Você não terá independência financeira!",
        });
      }
    }
  },
};
</script>
