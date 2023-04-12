<script setup>
import { storeToRefs } from "pinia";
import Portfolio from "src/repositories/Stock/Portfolio.js";
import { usePortfolioStore } from "src/stores/stock/portfolio";
import { reactive, toRaw } from "vue";

let { loading } = storeToRefs(usePortfolioStore()),
  form = reactive({
    code: null,
    date: null,
    value: 0,
    quantity: 0,
  });

const submit = async () => {
  loading.value = true;
  // TODO: Fazer isso nao ser um Ref
  await Portfolio.post(form);
  setTimeout(() => {
    form.value = {
      code: null,
      date: null,
      value: 0,
      quantity: 0,
    };
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <q-form
    class="flex justify-between items-center q-my-sm full-width"
    @submit.prevent="submit()"
  >
    <q-input v-model="form.code" label="Código" required filled />
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
