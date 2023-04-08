<template>
  <div class="flex">
    <div class="flex justify-between full-width">
      <!-- <div class="col"> -->
      <q-badge color="secondary">
        {{ $formaters.money(patrimony) }}
      </q-badge>
      <!-- </div> -->
      <b class="q-ma-none text-center"> Patrimônio </b>
      <q-badge
        outline
        rounded
        color="secondary"
        class="cursor-pointer"
        @click="double(`patrimony`)"
      >
        x2
        <q-tooltip>Dobrar Limite patrimônio</q-tooltip>
      </q-badge>
    </div>
    <q-slider
      v-model="patrimony"
      :min="0"
      :max="max.patrimony"
      :step="100"
      snap
      label
      :label-value="$formaters.money(patrimony)"
      color="secondary"
    />

    <div class="flex justify-between full-width">
      <q-badge color="red"> {{ $formaters.money(costs) }} </q-badge>
      <b class="q-ma-none col text-center"> Gastos </b>
      <q-badge
        outline
        rounded
        color="red"
        class="cursor-pointer"
        @click="double(`costs`)"
      >
        x2
        <q-tooltip>Dobrar Limite gastos</q-tooltip>
      </q-badge>
    </div>
    <q-slider
      v-model="costs"
      :min="0"
      :max="max.costs"
      :step="100"
      snap
      label
      :label-value="$formaters.money(costs)"
      color="red"
    />

    <div class="flex justify-between full-width">
      <q-badge color="positive">
        {{ $formaters.money(incomes) }}
      </q-badge>

      <b class="q-ma-none text-center"> Ganhos </b>
      <q-badge
        outline
        rounded
        color="positive"
        class="cursor-pointer"
        @click="double(`incomes`)"
      >
        x2
        <q-tooltip>Dobrar Limite ganhos</q-tooltip>
      </q-badge>
    </div>
    <q-slider
      v-model="incomes"
      :min="0"
      :max="max.incomes"
      :step="100"
      snap
      label
      :label-value="$formaters.money(incomes)"
      color="positive"
    />
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import { useProjectionStore } from "src/stores/projection";

export default {
  name: "FreedomSimulator",
  computed: {
    ...mapWritableState(useProjectionStore, [
      "patrimony",
      "incomes",
      "costs",
      "month",
      "investment",
      "inflation",
    ]),
  },
  data() {
    return {
      tab: "Tempo",
      months: 24,
      max: {
        patrimony: 100000,
        incomes: 100000,
        costs: 100000,
      },
    };
  },
  methods: {
    double(value) {
      this.max[value] *= 2;
    },
  },
};
</script>
