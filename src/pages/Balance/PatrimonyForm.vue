<template>
  <q-input
    filled
    label="Capital Atual"
    type="number"
    step="0.01"
    v-model="patrimony"
    @keyup.enter="persist"
  >
    <template v-slot:append>
      <q-btn
        dense
        no-caps
        rounded
        color="positive"
        class="q-px-md"
        label="Salvar"
        @click="persist"
      />
    </template>
  </q-input>
</template>

<script>
import { mapWritableState } from "pinia";
import { useBalanceStore } from "src/stores/balance";

export default {
  name: "BalancePatrimonyForm",
  computed: {
    ...mapWritableState(useBalanceStore, ["patrimony", "persistPatrimony"]),
  },
  methods: {
    persist() {
      if (!this.patrimony) {
        this.$q.notify({
          type: "negative",
          message: "Insira um valor válido!",
        });
        return;
      }
      this.persistPatrimony();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.q-field--dense) {
  .q-field__control {
    height: inherit;

    .q-field__native {
      padding: 0 !important;
    }
  }
}
</style>
