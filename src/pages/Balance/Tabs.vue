<template>
  <q-tabs v-model="tab" inline-label dense class="q-mt-md">
    <q-tab
      :name="$CONST.FINANCE.BALANCE.COST"
      class="text-negative rounded"
      icon="add"
      label="Adicionar Passivo"
    >
      <q-tooltip>Adicionar Gasto</q-tooltip>
    </q-tab>
    <q-tab
      :name="$CONST.FINANCE.BALANCE.INCOME"
      class="text-positive rounded"
      icon="add"
      label="Adicionar Ativo"
    >
      <q-tooltip>Adicionar Ganho</q-tooltip>
    </q-tab>
  </q-tabs>

  <q-tab-panels
    id="tab-panels"
    class="q-my-md rounded shadow-1 w-50"
    style="overflow: visible"
    v-model="tab"
    animated
  >
    <q-tab-panel :name="$CONST.FINANCE.BALANCE.COST">
      <q-icon
        name="close"
        size="sm"
        class="absolute cursor-pointer q-pa-xs bg-red text-white rounded"
        style="right: -5px; top: -5px"
        @click="tab = null"
      />
      <BalanceForm
        placeholder="Nome da Renda"
        v-model:name="name"
        v-model:value="value"
        @add="addOnStore"
      />
    </q-tab-panel>
    <q-tab-panel :name="$CONST.FINANCE.BALANCE.INCOME">
      <q-icon
        name="close"
        size="sm"
        class="absolute cursor-pointer q-pa-xs bg-red text-white rounded"
        style="right: -5px; top: -5px"
        @click="tab = null"
      />
      <BalanceForm
        placeholder="Nome da Renda"
        v-model:name="name"
        v-model:value="value"
        @add="addOnStore"
      />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { mapActions } from "pinia";
import BalanceForm from "src/pages/Balance/Form.vue";
import { useBalanceStore } from "src/stores/balance";

export default {
  name: "BalanceTabs",
  components: { BalanceForm },
  data() {
    return {
      tab: null,
      name: null,
      value: 0,
    };
  },
  methods: {
    ...mapActions(useBalanceStore, ["add"]),
    addOnStore(object) {
      if (!this.tab || !this.tab) {
        this.$q.notify({ type: "negative", message: "Insira nome e valor!" });
        return;
      }
      this.add({ ...object, type: this.tab });
      this.tab = null;
      this.name = null;
      this.value = 0;
    },
  },
};
</script>
