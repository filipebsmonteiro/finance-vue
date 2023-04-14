<template>
  <q-list class="card-list card-list-3">
    <q-expansion-item class="q-card shadow-0">
      <template v-slot:header>
        <div class="flex items-center">
          <span class="rounded q-pa-xs bg-grey-3 q-mr-md">
            <q-icon name="percent" size="md" color="positive" />
          </span>
          <div class="text-weight-medium">
            <p class="q-mb-none">
              {{
                (simulation.investment - simulation.inflation)
                  .toFixed(2)
                  .replace(".", ",")
              }}%
            </p>
            <p class="text-grey-6 q-mb-none">Ganho real mensal</p>
          </div>
        </div>
      </template>
      <div class="q-pa-md">
        <q-input
          v-model="simulation.inflation"
          type="number"
          step="0.01"
          min="0"
          label="IPCA (Últimos 12 meses)"
          @update:model-value="loadList()"
        >
          <template v-slot:append>%</template>
        </q-input>
        <q-input
          v-model="simulation.investment"
          borderless
          type="number"
          step="0.01"
          min="0"
          label="Retorno investimentos (Mensal)"
          @update:model-value="loadList()"
        >
          <template v-slot:append>%</template>
        </q-input>
      </div>
    </q-expansion-item>

    <q-expansion-item class="q-card shadow-0">
      <template v-slot:header>
        <div class="flex items-center">
          <span class="rounded q-pa-xs bg-grey-3 q-mr-md">
            <q-icon name="calendar_month" size="md" color="warning" />
          </span>
          <div class="text-weight-medium">
            <p class="q-mb-none">
              {{ parseInt(monthsToIndependence / 12) }} Anos
            </p>
            <p class="text-grey-6 q-mb-none">
              {{ monthsToIndependence % 12 }} Meses
            </p>
          </div>
        </div>
      </template>
      <q-list>
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
        <q-item>
          <PatrimonySimulator />
        </q-item>
      </q-list>
    </q-expansion-item>

    <q-expansion-item class="q-card shadow-0">
      <template v-slot:header>
        <div class="flex items-center">
          <span class="rounded q-pa-xs bg-grey-3 q-mr-md">
            <q-icon name="las la-cog" size="md" color="info" />
          </span>
          <div class="text-weight-medium">
            <p class="q-mb-none">Controle</p>
            <p class="text-grey-6 q-mb-none">Opções e simulador</p>
          </div>
        </div>
      </template>
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
            label="Mostrar Anos"
          />
        </q-item>
      </q-list>
    </q-expansion-item>
  </q-list>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useBalanceStore } from "src/stores/balance";
import { useIPCAStore } from "src/stores/ipca";
import { useProjectionStore } from "src/stores/projection";
import PatrimonySimulator from "src/components/Simulator/Patrimony.vue";

export default {
  name: "FreedomHeader",
  components: { PatrimonySimulator },
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
    ...mapState(useProjectionStore, ["list", "monthsToIndependence"]),
    ...mapWritableState(useProjectionStore, ["simulation"]),
    ...mapState(useIPCAStore, ["loading"]),
  },
  methods: {
    ...mapActions(useBalanceStore, { loadBalances: "load" }),
    ...mapActions(useIPCAStore, ["loadLastMonths"]),
    ...mapActions(useProjectionStore, ["loadInflation", "loadList", "reset"]),
  },
  async mounted() {
    await this.loadLastMonths({});
    await this.loadBalances();
    this.reset();
    this.loadList();
  },
};
</script>

<style lang="scss" scoped>
.card-list {
  align-items: flex-start;

  .q-card {
    padding: 8px;
  }
}
:deep(.q-expansion-item__container) {
  width: 100%;
  .q-item {
    justify-content: space-between;

    .q-focus-helper {
      display: contents;
    }
    .q-item__section--side:last-of-type {
      float: right;
      padding-right: 0;
    }
  }
}
</style>
