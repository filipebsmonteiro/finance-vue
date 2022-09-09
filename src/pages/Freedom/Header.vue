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
      :label="`${list.length} meses`"
    >
      <q-list>
        <q-item class="flex column items-center">
          <q-toggle
            v-model="untilFreedom"
            label="Projetar até a Independência"
          />
          <q-input
            v-show="!untilFreedom"
            v-model="currentMonths"
            type="number"
            label="Meses"
            min="0"
            max="1440"
            readonly
          >
            <template v-slot:prepend>
              <q-btn flat rounded icon="remove" @click="currentMonths--" />
            </template>
            <template v-slot:append>
              <q-btn flat rounded icon="add" @click="currentMonths++" />
            </template>
          </q-input>
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
            :model-value="modelChart"
            @update:model-value="$emit('update:model-chart', $event)"
            label="Mostrar Gráfico"
          />
        </q-item>
        <q-separator />
        <q-item class="flex column items-center">
          <q-toggle
            :model-value="modelCard"
            @update:model-value="$emit('update:model-card', $event)"
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
import { ref } from "vue";

export default {
  name: "FreedomHeader",
  props: {
    modelChart: {
      type: Boolean,
      default: true,
    },
    modelCard: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(useBalanceStore, [
      "getTotalCosts",
      "getTotalIncomes",
      "getTotal",
    ]),
    ...mapState(useProjectionStore, ["list"]),
    ...mapWritableState(useProjectionStore, [
      "investment",
      "inflation",
      "untilFreedom",
      "currentMonths",
    ]),
    ...mapState(useIPCAStore, [
      "loadLastMonths",
      "getLastMonthsAverage",
      "loading",
    ]),
  },
  methods: {
    ...mapActions(useBalanceStore, {
      loadBalances: "load",
    }),
  },
  async mounted() {
    this.loadBalances();
    await this.loadLastMonths({});
    this.inflation =
      this.getLastMonthsAverage > 0
        ? ref(this.getLastMonthsAverage)
        : this.inflation;
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
