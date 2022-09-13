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
      Seu saldo Ao fim do mês é: <b>{{ $formaters.money(incomes - costs) }}</b>
      Com seu patrimonio atual Para independência em
      <q-input type="number" v-model="months" class="flex-inline" />
      meses você precisaria de um saldo de:
      <b>{{ $formaters.money(balance) }}</b>
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
  name: "FreedomSimulator",
  computed: {
    ...mapWritableState(useProjectionStore, [
      "reset",
      "patrimony",
      "incomes",
      "costs",
      "month",
      "investiment",
      "inflation",
    ]),
    balance() {
      /**
       * Pega os meses
       * Pega o valor de Custos
       * Calcula quanto de patrimonio deve ter
       * Calcula a Diferença do Atual pro Que precisa
       *
       * Simples => Divide diferença na quantidade de meses
       * Composto => Divide diferença na quantidade de meses acrescentando juro composto
       */

      return 0;
    },
  },
  data() {
    return {
      months: 0,
    };
  },
};
</script>
