<template>
  <q-btn-group spread rounded>
    <q-btn-dropdown
      color="dark"
      no-caps
      outline
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
  </q-btn-group>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useBalanceStore } from "src/stores/balance";
import { useProjectionStore } from "src/stores/projection";

export default {
  name: "FreedomHeader",
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
  },
  methods: {
    ...mapActions(useBalanceStore, {
      loadBalances: "load",
    }),
  },
  mounted() {
    this.loadBalances();
  },
};
</script>
