<script setup>
import IdentifyColumns from "src/components/Sheet/IdentifyColumns.vue";
import ImportSheet from "src/components/Sheet/ReadFile.vue";
import { reactive, ref } from "vue";

const props = defineProps({
  fireBaseColumns: Array,
  sending: Boolean,
});

const emit = defineEmits(["submit"]);

let step = ref(1),
  file = reactive({
    columns: [],
    rows: [],
  });

const fileReadHandler = (data) => {
  file = data;
  step.value = 2;
};

const submitHandler = (columns) => {
  const Entities = file.rows.map((row) => {
    const Entity = {};
    Object.entries(columns).map(
      ([fireBaseColumn, fileColumn]) =>
        (Entity[fireBaseColumn] = row[fileColumn])
    );
    return Entity;
  });

  emit("submit", Entities);
};
</script>

<template>
  <q-stepper v-model="step" ref="stepper" color="primary" animate flat>
    <q-step
      :name="1"
      title="Faça o Upload do Arquivo XLSX"
      icon="assignment"
      :done="step > 1"
    >
      <ImportSheet @read="fileReadHandler" />
    </q-step>
    <q-step
      :name="2"
      title="Identifique as Colunas"
      icon="form"
      :done="step > 2"
    >
      <IdentifyColumns
        :file-columns="file.columns"
        :fire-base-columns="fireBaseColumns"
        @submit="submitHandler"
      />
    </q-step>
  </q-stepper>
</template>
