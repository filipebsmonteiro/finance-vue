<template>
  <q-tabs v-model="tab" inline-label no-caps>
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
    style="overflow: visible"
    class="bg-transparent"
    v-model="tab"
    animated
  >
    <q-tab-panel
      :name="$CONST.FINANCE.BALANCE.COST"
      class="bg-white rounded shadow-1"
    >
      <q-icon
        name="close"
        class="q-pa-xs bg-red text-white rounded"
        @click="tab = null"
      />
      <BalanceForm
        placeholder="Nome da Renda"
        v-model:name="name"
        v-model:value="value"
        @add="addOnStore"
      />
    </q-tab-panel>
    <q-tab-panel
      :name="$CONST.FINANCE.BALANCE.INCOME"
      class="bg-white rounded shadow-1"
    >
      <q-icon
        name="close"
        class="q-pa-xs bg-red text-white rounded"
        @click="tab = null"
      />
      <BalanceForm
        placeholder="Nome do Custo"
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

<style lang="scss" scoped>
::v-deep(.q-tab-panel) {
  // Show shadow
  margin: 5px;
  height: calc(100% - 10px);
  width: calc(100% - 10px);

  .q-icon {
    cursor: pointer;
    position: absolute;
    right: -5px;
    top: 0px;
    font-size: 24px;

    @media screen and (max-width: 1024px) {
      right: 0px;
      top: 2px;
      font-size: 20px;
    }
  }
}
</style>
