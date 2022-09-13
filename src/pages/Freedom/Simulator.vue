<template>
  <h5 class="q-mb-none flex justify-center">Tempo</h5>
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
  <p class="q-mb-none flex justify-between">
    Meses para Independência:
    <q-badge> {{ month.independency }} </q-badge>
  </p>
  <q-slider
    v-model="month.independency"
    :min="1"
    :max="1440"
    :step="1"
    snap
    label
  />

  <h5 class="q-mb-none flex justify-center">Financeiro</h5>
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

  <div class="flex justify-center">
    <q-btn label="Resetar" @click="reset" />
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import { useBalanceStore } from "src/stores/balance";
import { useProjectionStore } from "src/stores/projection";

export default {
  name: "FreedomSimulator",
  computed: {
    ...mapWritableState(useBalanceStore, ["patrimony"]),
    ...mapWritableState(useProjectionStore, [
      "month",
      "patrimony",
      "incomes",
      "costs",
      "reset",
    ]),
  },
};
</script>
