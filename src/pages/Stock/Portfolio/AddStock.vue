<script setup>
import { storeToRefs } from "pinia";
import Portfolio from "src/repositories/Stock/Portfolio.js";
import { usePortfolioStore } from "src/stores/stock/portfolio";
import { useNationalQuotationStore } from "src/stores/stock/quotation/national";
import { reactive } from "vue";

let { loading } = storeToRefs(usePortfolioStore()),
  form = reactive({
    code: null,
    date: null,
    value: 0,
    quantity: 0,
  }),
  { autocomplete, $resetAutoComplete } = useNationalQuotationStore(),
  { autocompleteOptions } = storeToRefs(useNationalQuotationStore());

const filterStocksFn = async (val, update) => {
  if (val === "") {
    update($resetAutoComplete);
    return;
  }

  await autocomplete(val);
  update();
};

const submit = async () => {
  if (!form.code) return;
  loading = true;
  await Portfolio.post(form);
  form.value = {
    code: null,
    date: null,
    value: 0,
    quantity: 0,
  };
  loading = false;
};
</script>

<template>
  <q-form
    class="flex justify-between items-center q-my-sm full-width"
    @submit.prevent="submit()"
  >
    <q-select
      v-model="form.code"
      input-debounce="1500"
      label="Código"
      :options="autocompleteOptions"
      @filter="filterStocksFn"
      use-input
      filled
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-input
      v-model="form.date"
      label="Data da Compra"
      type="date"
      required
      filled
    />
    <q-input
      v-model="form.value"
      label="Valor da Compra"
      type="number"
      required
      filled
    />
    <q-input
      v-model="form.quantity"
      label="Quantidade da Compra"
      type="number"
      required
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
</template>

<style lang="scss" scoped>
.q-form {
  justify-content: center;
  gap: 15px;

  .q-field {
    flex-basis: 48%;
  }
}
</style>
