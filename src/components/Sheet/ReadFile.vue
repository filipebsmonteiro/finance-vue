<script setup>
import { reactive } from "vue";
import { read, utils } from "xlsx";

const emit = defineEmits(["read"]);

let form = reactive({
  file: null,
  columns: [],
  rows: [],
  loading: false,
});

const readFn = async () => {
  form.loading = true;
  const data = await form.file.arrayBuffer();
  const workbook = read(data, { cellDates: true });
  const json = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  const keysFirstRow = Object.keys(json[0]);
  form.columns = keysFirstRow;
  // const elementsHasAllProperties = json.filter((row) =>
  //   keysFirstRow.every((key) => row.hasOwnProperty(key))
  // );
  // form.rows = elementsHasAllProperties;
  form.rows = json;
  form.loading = false;
  emit("read", {
    columns: form.columns,
    rows: form.rows,
  });
};
</script>

<template>
  <!-- <q-inner v-if="form.loading" size="3em" /> -->
  <q-file
    v-model="form.file"
    label="Selecione ou arraste o arquivo aqui..."
    @update:model-value="readFn"
    :disable="form.loading"
    clearable
  >
    <q-inner-loading :showing="form.loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-file>
</template>
