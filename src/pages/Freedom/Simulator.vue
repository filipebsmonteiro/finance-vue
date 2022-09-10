<template>
  <p class="q-mb-none flex justify-between">
    Meses
    <q-badge> {{ currentMonths }} </q-badge>
  </p>
  <q-slider
    v-model="currentMonths"
    :min="12"
    :max="1440"
    :step="12"
    snap
    label
  />

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

  <q-btn label="Resetar" @click="reset"></q-btn>
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
      "currentMonths",
      "patrimony",
      "incomes",
      "costs",
      "reset",
    ]),
  },
};
</script>
