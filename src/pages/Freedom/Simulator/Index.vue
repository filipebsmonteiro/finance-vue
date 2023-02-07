<template>
  <q-expansion-item class="q-card q-mb-md" header-class="flex justify-center">
    <template #header>
      <h5 class="q-ma-none">Tempo</h5>
    </template>
    <div class="q-pa-md">
      <p class="q-mb-none flex justify-start">
        Projetar
        <q-badge class="q-mx-sm" rounded> {{ month.simulator }} </q-badge>
        Meses
      </p>
      <q-slider
        v-model="month.simulator"
        :min="0"
        :max="1440"
        :step="1"
        snap
        label
      />
      <p class="q-mb-none text-caption">
        Independência em:
        <b class="q-mx-xs">
          {{ parseInt(month.independency / 12) }}
        </b>
        Anos e
        <b class="q-mx-xs" rounded>
          {{ month.independency % 12 }}
        </b>
        Meses
      </p>
    </div>
  </q-expansion-item>

  <q-expansion-item class="q-card q-mb-md" header-class="flex justify-center">
    <template #header>
      <h5 class="q-ma-none">Financeiro</h5>
    </template>
    <div class="q-pa-md">
      <p class="q-mb-none flex justify-between">
        Patrimônio
        <q-badge color="secondary"> {{ $formaters.money(patrimony) }} </q-badge>
      </p>
      <q-slider
        v-model="patrimony"
        :min="0"
        :max="1000000"
        :step="100"
        snap
        label
        color="secondary"
      />
      <p class="q-mb-none flex justify-between">
        Gastos
        <q-badge color="red"> {{ $formaters.money(costs) }} </q-badge>
      </p>
      <q-slider
        v-model="costs"
        :min="0"
        :max="100000"
        :step="100"
        snap
        label
        color="red"
      />

      <p class="q-mb-none flex justify-between">
        Ganhos
        <q-badge color="positive"> {{ $formaters.money(incomes) }} </q-badge>
      </p>
      <q-slider
        v-model="incomes"
        :min="0"
        :max="100000"
        :step="100"
        snap
        label
        color="positive"
      />
    </div>
  </q-expansion-item>

  <q-expansion-item class="q-card q-mb-md" header-class="flex justify-center">
    <template #header>
      <h5 class="q-ma-none">Ajuste</h5>
    </template>
    <div class="q-pa-md">
      <p>
        Seu saldo Ao fim do mês é:
        <b>{{ $formaters.money(incomes - costs) }}</b>
      </p>
      Com seu patrimonio atual. Para alcançar a independência em
      <q-input type="number" v-model="months" class="flex-inline" />
      Meses:
      <ul>
        <li>
          <b>
            <u>Seu patrimônio acumulado deve ser:</u>
            {{ $formaters.money(independency.patrimony) }}
          </b>
        </li>
        <li>
          <b>
            <u>Seus Investimentos para cobrir os custos:</u>
            {{ $formaters.money(independency.investmentIncome) }}
          </b>
        </li>
        <li>
          <b>
            <u>Seus custos corrigidos pela inflação:</u>
            {{ $formaters.money(independency.costsOnFuture) }}
          </b>
        </li>
      </ul>
    </div>
  </q-expansion-item>

  <div class="flex justify-center">
    <q-btn label="Resetar" @click="reset" />
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import { useProjectionStore } from "src/stores/projection";

export default {
  name: "SimulatorIndex",
  computed: {
    ...mapWritableState(useProjectionStore, [
      "reset",
      "patrimony",
      "incomes",
      "costs",
      "month",
      "investment",
      "inflation",
    ]),
    independency() {
      // TODO: Validar melhor com negativos oque pode impedir a independencia

      let months = 0;
      const costGrowthPercentage = this.inflation / 100;
      const costsOnFuture = [...Array(parseInt(this.months))].reduce(
        (acc) => parseFloat((acc + acc * costGrowthPercentage).toFixed(2)),
        this.costs
      );

      const investmentGrowthPercentage = this.investment / 100;
      const initialPatrimony = this.patrimony > 0 ? this.patrimony : 1;
      const initialInvestmentIncome = parseFloat(
        (initialPatrimony * investmentGrowthPercentage).toFixed(2)
      );
      let investmentIncome = initialInvestmentIncome;
      let patrimony = initialPatrimony;
      while (investmentIncome < costsOnFuture) {
        investmentIncome = parseFloat(
          (patrimony * investmentGrowthPercentage).toFixed(2)
        );
        patrimony += parseFloat(
          (this.incomes - this.costs + investmentIncome).toFixed(2)
        ); // Adicionar investimentIncome é juros compostos
        months++;
      }

      return {
        costsOnFuture,
        investmentIncome,
        patrimony,
      };
    },
  },
  data() {
    return {
      months: 0,
    };
  },
};
</script>
