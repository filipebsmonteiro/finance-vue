<template>
  <q-page>
    <q-input v-model="months" label="Meses" min="0">
      <template v-slot:prepend>
        <q-btn flat rounded icon="remove" @click="months--" />
      </template>
      <template v-slot:append>
        <q-btn flat rounded icon="add" @click="months++" />
      </template>
    </q-input>

    <Simple :items="projections">
      <template v-slot:default="{ item }">
        <q-item-section>
          <q-item-label>
            {{ $formaters.date(item.date, false) }}
          </q-item-label>
          <q-item-label caption>
            {{ $formaters.money(item.balance_projection) }}
          </q-item-label>
        </q-item-section>
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
      const now = date.buildDate(Date.now());
      const final = date.addToDate(now, { months: this.months });
      let months = [];
      let balanceAccumulator = 0;

      for (
        let d = now;
        !date.isSameDate(d, final, "month");
        d = date.addToDate(d, { months: 1 })
      ) {
        balanceAccumulator += this.monthBalance;
        // months.push(date.formatDate(new Date(d), "YYYY-MM-DDTHH:mm:ss.SSSZ"));
        months.push({
          year: date.formatDate(new Date(d), "YYYY"),
          date: date.formatDate(new Date(d), "YYYY-MM-DD"),
          balance_projection: balanceAccumulator,
          classes:
            "bg-white shadow-shine rounded q-mb-sm flex justify-between items-center",
        });
      }
      return months;
    },
  },
  data() {
    return {
      monthBalance: 0,
      months: 6,
    };
  },
  mounted() {
    let balances = this.$q.localStorage.getItem(
      this.$CONST.localStorage.FINANCE.BALANCES
    );

    if (balances && balances.length > 0) {
      const incomesSum = balances
        .filter((b) => b.type === "income")
        .reduce((acc, cur) => acc + parseFloat(cur.value), 0);

      const expensesSum = balances
        .filter((b) => b.type === "expense")
        .reduce((acc, cur) => acc + parseFloat(cur.value), 0);
      this.monthBalance = incomesSum - expensesSum;
    }
  },
};
</script>
