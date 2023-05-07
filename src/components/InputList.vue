<script setup>
import { QInput, QSelect } from "quasar";

const props = defineProps({
  fields: {
    type: Array,
    validator: (array) => {
      return array.every(
        (obj) =>
          obj.hasOwnProperty(`component`) &&
          obj.hasOwnProperty(`key`) &&
          (obj.hasOwnProperty(`label`) || obj.hasOwnProperty(`placeholder`))
      );
    },
  },
  values: Array,
  addLabel: {
    type: String,
    default: `Adicionar linha`,
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

const updateValue = (index, key, value) => {
  const updated = props.values.map((line, i) => ({
    ...line,
    ...(i === index ? { [key]: value } : null),
  }))[index];
  emit("update:model-value", updated);
};

const addLine = () => {
  const newLine = props.fields.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.key]: null,
    }),
    {}
  );
  emit("update:model-value", newLine);
};

const getComponent = (field) => {
  switch (field.component) {
    case `q-select`:
      return QSelect;
    case `q-input`:
      return QInput;

    default:
      return QInput;
  }
};
</script>

<template>
  <q-list>
    <q-item
      v-for="(value, index) in props.values"
      :key="index"
      class="rounded items-center"
      flat
    >
      <q-item-section v-for="(field, idx) in fields" :key="`${index}${idx}`">
        <component
          :is="getComponent(field)"
          v-bind="field"
          :model-value="value[field.key]"
          @update:model-value="($evt) => updateValue(index, field.key, $evt)"
        >
          <template v-if="field.append" v-slot:append>
            <q-icon v-if="field.append.icon" :name="field.append.icon" />
          </template>
          <template v-if="field.prepend" v-slot:prepend>
            <q-icon v-if="field.prepend.icon" :name="field.prepend.icon" />
          </template>
        </component>
      </q-item-section>

      <q-item-section v-if="!props.hideDeleteLine" top side>
        <q-btn
          flat
          round
          color="negative"
          icon="delete"
          @click="emit('remove-line', value.id)"
        />
      </q-item-section>
    </q-item>

    <q-item v-if="!props.hideAddLine">
      <!-- <q-item-section side></q-item-section> -->
      <q-item-section>
        <q-btn
          flat
          rounded
          color="positive"
          icon="add"
          :label="props.addLabel"
          @click="addLine()"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style lang="scss" scoped></style>
