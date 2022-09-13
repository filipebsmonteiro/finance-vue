<template>
  <q-btn-group class="header" spread rounded>
    <q-btn-dropdown
      color="dark"
      no-caps
      outline
      dropdown-icon="query_stats"
      :label="`${(investment - inflation).toFixed(2).replace('.', ',')}% a.m.`"
      :loading="loading"
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
      outline
      dropdown-icon="calendar_month"
      :label="`${monthsToIndependence} meses`"
    >
      <q-list>
        <q-item class="flex column items-center">
          {{ `${monthsToIndependence} Meses para Independência` }}
        </q-item>
        <q-separator />
        <q-item class="flex justify-between">
          <q-item-label class="text-positive flex column">
            <b>Ganhos: </b>
            <span class="text-caption">
              {{ $formaters.money(getTotalIncomes) }}
            </span>
          </q-item-label>
          <q-item-label class="text-negative flex column">
            <b>Custos: </b>
            <span class="text-caption">
              {{ $formaters.money(getTotalCosts) }}
            </span>
          </q-item-label>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn-dropdown
      color="dark"
      no-caps
      outline
      dropdown-icon="visibility"
      :label="`Mostrar`"
    >
      <q-list>
        <q-item class="flex column items-center">
          <q-toggle
            :model-value="showSimulator"
            @update:model-value="$emit('update:show-simulator', $event)"
            label="Mostrar Simulador"
          />
        </q-item>
        <q-item class="flex column items-center">
          <q-toggle
            :model-value="showChart"
            @update:model-value="$emit('update:show-chart', $event)"
            label="Mostrar Gráfico"
          />
        </q-item>
        <q-separator />
        <q-item class="flex column items-center">
          <q-toggle
            :model-value="showCard"
            @update:model-value="$emit('update:show-card', $event)"
            label="Mostrar Cards"
          />
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-btn-group>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useBalanceStore } from "src/stores/balance";
import { useIPCAStore } from "src/stores/ipca";
import { useProjectionStore } from "src/stores/projection";

export default {
  name: "FreedomHeader",
  props: {
    showChart: {
      type: Boolean,
      default: true,
    },
    showCard: {
      type: Boolean,
      default: false,
    },
    showSimulator: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(useBalanceStore, ["getTotalCosts", "getTotalIncomes"]),
    ...mapState(useProjectionStore, ["list", "loadIPCAIntoInflation"]),
    ...mapWritableState(useProjectionStore, ["investment", "inflation"]),
    ...mapState(useIPCAStore, ["loading"]),
    monthsToIndependence() {
      if (this.list && Array.isArray(this.list)) {
        return this.list.filter(
          (l) => l.investimentIncome < l.costWithInflation
        ).length;
      }
      return null;
    },
  },
  methods: {
    ...mapActions(useBalanceStore, {
      loadBalances: "load",
    }),
  },
  async mounted() {
    this.loadBalances();
    this.loadIPCAIntoInflation();
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 50%;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
}
</style>
