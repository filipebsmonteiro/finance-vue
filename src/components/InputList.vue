<script setup>
import { QInput, QSelect } from "quasar";

const props = defineProps({
  list: {
    type: Array,
    validator: (array) => {
      // return Object.values(obj).every(v => v.);
      return array.every((line) =>
        line.every(
          (obj) =>
            obj.hasOwnProperty(`component`) &&
            (obj.hasOwnProperty(`label`) ||
              obj.hasOwnProperty(`name`) ||
              obj.hasOwnProperty(`placeholder`)) &&
            obj.hasOwnProperty(`model-value`)
        )
      );
    },
  },
  hideAddLine: {
    type: Boolean,
    default: false,
  },
  hideDeleteLine: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([`update:model-value`]);

const updateValue = (fieldName, value) => {
  emit("update:model-value", { [fieldName]: value });
};

const getComponent = (field) => {
  switch (field.component) {
    case `q-select`:
      return QSelect;

    default:
      return QInput;
  }
};
</script>

<template>
  <q-list separator>
    <q-item
      v-for="(line, index) in props.list"
      :key="index"
      class="rounded items-center"
      flat
    >
      <q-item-section v-for="(field, idx) in line" :key="`${index}${idx}`">
        <component
          :is="getComponent(field)"
          v-bind="field"
          @update:model-value="($evt) => updateValue(field.name, $evt)"
        ></component>
      </q-item-section>

      <q-item-section v-if="!props.hideDeleteLine" top side>
        <q-btn
          flat
          round
          color="negative"
          icon="delete"
          @click="removeLine(line)"
        />
      </q-item-section>
    </q-item>

    <q-item v-if="!props.hideAddLine">
      <q-item-section side></q-item-section>
      <q-item-section side>
        <q-btn flat round color="positive" icon="add" @click="addLine()" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style lang="scss" scoped></style>
