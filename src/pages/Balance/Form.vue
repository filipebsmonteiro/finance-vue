<template>
  <slot name="before" />
  <q-input
    :placeholder="placeholder"
    :dense="dense"
    :borderless="borderless"
    :filled="filled"
    :model-value="name"
    @update:model-value="$emit('update:name', $event)"
    @keyup.enter="add"
  />
  <q-input
    placeholder="Valor"
    type="number"
    step="0.01"
    :dense="dense"
    :borderless="borderless"
    :filled="filled"
    :model-value="value"
    @update:model-value="$emit('update:value', parseFloat($event))"
    @keyup.enter="add"
  />
  <slot name="after" />
</template>

<script>
export default {
  name: "BalanceForm",
  emits: ["add", "update:name", "update:value"],
  props: {
    placeholder: {
      type: String,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    name: String,
    value: Number,
  },
  methods: {
    add() {
      if (!this.name || !this.value) {
        this.$q.notify({ type: "negative", message: "Insira nome e valor!" });
        return;
      }

      this.$emit("add", { name: this.name, value: this.value });
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
