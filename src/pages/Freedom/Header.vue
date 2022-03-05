<template>
  <q-btn-group spread rounded>
    <q-btn-dropdown
      color="dark"
      no-caps
      glossy
      dropdown-icon="query_stats"
      :label="`Crescimento:
        ${(investment - inflation).toFixed(2).replace('.', ',')}% a.m.`"
    >
      <div class="q-pa-md">
        <q-input
          v-model="inflation"
          type="number"
          step="0.01"
          min="0"
          label="IPCA (Últimos 12 meses)"
        >
          <template v-slot:append>%</template>
        </q-input>
        <q-input
          v-model="investment"
          borderless
          type="number"
          step="0.01"
          min="0"
          label="Retorno investimentos (Mensal)"
        >
          <template v-slot:append>%</template>
        </q-input>
      </div>
    </q-btn-dropdown>

    <q-btn-dropdown
      color="dark"
      no-caps
      glossy
      dropdown-icon="calendar_month"
      :label="`${monthQuantity} meses`"
    >
      <div class="q-pa-md flex column items-center">
        <p class="q-my-sm text-positive">
          <b>Ganhos: </b>{{ $formaters.money(income) }}
        </p>
        <p class="q-my-sm text-negative">
          <b>Custo de Vida: </b>{{ $formaters.money(cost) }}
        </p>

        <q-separator class="q-mx-lg" />

        <q-toggle v-model="untilFreedom" label="Projetar até a Independência" />
        <q-input
          v-show="!untilFreedom"
          v-model="monthQuantity"
          type="number"
          label="Meses"
          min="0"
          max="1440"
        >
          <template v-slot:prepend>
            <q-btn flat rounded icon="remove" @click="monthQuantity--" />
          </template>
          <template v-slot:append>
            <q-btn flat rounded icon="add" @click="monthQuantity++" />
          </template>
        </q-input>
      </div>
    </q-btn-dropdown>
  </q-btn-group>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    untilFreedom: {
      get() {
        return this.$store.getters["projection/untilFreedom"];
      },
      set(value) {
        this.$store.commit("projection/setUntilFreedom", value);
      },
    },
    monthQuantity: {
      get() {
        return this.$store.getters["projection/monthQuantity"];
      },
      set(value) {
        this.$store.commit("projection/setMonthsQuantity", value);
      },
    },
    investment: {
      get() {
        return this.$store.getters["projection/investment"];
      },
      set(value) {
        this.$store.commit("projection/setInvestment", value);
      },
    },
    inflation: {
      get() {
        return this.$store.getters["projection/inflation"];
      },
      set(value) {
        this.$store.commit("projection/setInflation", value);
      },
    },
    ...mapGetters({
      balance: "balance/monthlyBalance",
      income: "balance/monthlyIncome",
      cost: "balance/monthlyCost",
    }),
  },
  methods: {
    ...mapActions({
      loadBalance: "balance/loadMonthlyBalance",
    }),
    calcMonthsToFreedom() {
      let month = 1;
      let balanceProjection = this.balance;
      let investmentProjection =
        balanceProjection * ((this.investment - this.inflation) / 100);

      for (month = 1; investmentProjection < this.cost; month++) {
        if (month === 1440) {
          this.$q.notify({
            type: "negative",
            message: "Sua independência ultrapassa 120 anos!",
          });
          break;
        }
        balanceProjection =
          // balanceProjection + this.balance + investmentProjection; // Usando o mês passado
          balanceProjection + this.balance;
        investmentProjection =
          balanceProjection * ((this.investment - this.inflation) / 100);
      }

      return month;
    },
  },
  mounted() {
    this.loadBalance();
    if (this.untilFreedom) {
      this.$store.commit(
        "projection/setMonthsQuantity",
        this.calcMonthsToFreedom()
      );
    }
  },
};
</script>
