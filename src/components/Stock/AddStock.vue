<script setup>
import { storeToRefs } from "pinia";
import Portfolio from "src/repositories/Stock/Portfolio.js";
import { useNationalQuotationStore } from "src/stores/stock/quotation/national";
import { reactive, ref, onMounted } from "vue";

const props = defineProps({ code: String });

let form = reactive({
    code: null,
    date: null,
    value: null,
    quantity: null,
  }),
  sending = ref(false),
  { autocomplete, $resetAutoComplete } = useNationalQuotationStore(),
  { autocompleteOptions } = storeToRefs(useNationalQuotationStore());
onMounted(() => {
  if (props.code) {
    autocompleteOptions.value = [props.code];
    form.code = props.code;
  }
});

const filterStocksFn = async (val, update) => {
  if (props.code) {
    autocompleteOptions.value = [props.code];
    form.code = props.code;
    return;
  }

  if (val === "") {
    update($resetAutoComplete);
    return;
  }

  await autocomplete(val);
  update();
};

const submit = async () => {
  if (!form.code) return;
  sending.value = true;
  await Portfolio.post(form);
  form = {
    code: null,
    date: null,
    value: null,
    quantity: null,
  };
  sending.value = false;
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
      :disable="props.code !== ''"
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
      mask="###,##"
      reverse-fill-mask
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
      :loading="sending"
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
