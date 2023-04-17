<script setup>
import { storeToRefs } from "pinia";
import Portfolio from "src/repositories/Finance/Portfolio.js";
import { usePortfolioStore } from "src/stores/stock/portfolio";
import { reactive, ref } from "vue";
import { read, utils } from "xlsx";

let { loading, list } = storeToRefs(usePortfolioStore()),
  step = ref(1),
  form = reactive({
    file: null,
    columns: [],
    rows: [],
    codeColumn: null,
    dateColumn: null,
    valueColumn: 0,
    quantityColumn: 0,
  });
const { load } = usePortfolioStore();

const readFn = async () => {
  form.loading = true;
  const data = await form.file.arrayBuffer();
  const workbook = read(data, { cellDates: true });
  const json = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  const keysFirstRow = Object.keys(json[0]);
  form.columns = keysFirstRow;
  const elementsHasAllProperties = json.filter((row) =>
    keysFirstRow.every((key) => row.hasOwnProperty(key))
  );
  form.rows = elementsHasAllProperties;
  step.value = 2;
  form.loading = false;
};

const submit = async () => {
  if (!form.rows) return;

  await load();

  const contributions = form.rows
    .map((contribution) => {
      const object = {
        code: contribution[form.codeColumn],
        date: contribution[form.dateColumn].toJSON().slice(0, 10),
        value: contribution[form.valueColumn],
        quantity: contribution[form.quantityColumn],
      };

      const exists = list.value.find(
        (inDB) =>
          inDB.code === object.code &&
          inDB.date === object.date &&
          inDB.value === object.value &&
          inDB.quantity === object.quantity
      );
      if (exists) return;

      return object;
    })
    .filter((c) => c);

  loading.value = true;
  if (contributions.length > 0) await Portfolio.post(contributions);
  form.value = {
    loading: false,
    file: null,
    columns: [],
    rows: [],
    codeColumn: null,
    dateColumn: null,
    valueColumn: null,
    quantityColumn: null,
  };
  step.value = 1;
  loading.value = false;
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
      <q-spinner v-if="form.loading" size="3em" />
      <q-file
        v-model="form.file"
        label="Selecione ou arraste o arquivo aqui..."
        @update:model-value="readFn"
        :disable="form.loading"
        clearable
      />
    </q-step>
    <q-step
      :name="2"
      title="Identifique as Colunas"
      icon="form"
      :done="step > 2"
    >
      <q-form
        class="flex justify-between items-center q-my-sm full-width"
        @submit.prevent="submit()"
      >
        <q-select
          v-model="form.codeColumn"
          label="Coluna de Código"
          :options="form.columns"
          :disabled="form.columns === 0"
          filled
        />
        <q-select
          v-model="form.dateColumn"
          label="Coluna de Data"
          :options="form.columns"
          :disabled="form.columns === 0"
          filled
        />
        <q-select
          v-model="form.valueColumn"
          label="Coluna de Valor"
          :options="form.columns"
          :disabled="form.columns === 0"
          filled
        />
        <q-select
          v-model="form.quantityColumn"
          label="Coluna de Quantidade"
          :options="form.columns"
          :disabled="form.columns === 0"
          filled
        />
        <q-btn
          type="submit"
          color="primary"
          label="Salvar"
          icon-right="save"
          :loading="loading"
        />
      </q-form>
    </q-step>
  </q-stepper>
</template>

<style lang="scss" scoped>
.q-form {
  justify-content: center;
  gap: 15px;

  .q-field {
    flex-basis: 48%;
  }
}
:deep(.q-stepper__step-inner) {
  padding: 16px;
}
</style>
