<script setup>
import { useQuasar } from "quasar";
import ImportStepper from "src/components/Sheet/ImportStepper.vue";
import { investingETFsWith39 } from "src/repositories/Investment/Data/ETF";
import { REITsWith13, REITsWithB } from "src/repositories/Investment/Data/REIT";
import ETF from "src/repositories/Investment/Firebase/ETF";
import REIT from "src/repositories/Investment/Firebase/REIT";
import { ref } from "vue";

let sending = ref(false);
const $q = useQuasar();

const handleREIT = async (rows) => {
  sending.value = true;
  const data = rows.map((row) => {
    const sufix = REITsWithB.includes(row.code)
      ? `11B`
      : REITsWith13.includes(row.code)
      ? `23`
      : `11`;
    return { ...row, code: `${row.code}${sufix}` };
  });
  await REIT.post(data);
  $q.notify({
    type: "positive",
    message: "REITs FIIs Importados com Sucessso!",
  });
  sending.value = false;
};

const handleETF = async (rows) => {
  sending.value = true;
  const data = rows.map((row) => {
    const sufix = investingETFsWith39.includes(row.code) ? `39` : `11`;
    return { ...row, code: `${row.code}${sufix}` };
  });
  await ETF.post(data);
  $q.notify({
    type: "positive",
    message: "ETFs Importados com Sucessso!",
  });
  sending.value = false;
};
</script>

<template>
  <q-page>
    <h4 class="q-mb-none">REITs (FIIs)</h4>
    <ImportStepper
      :sending="sending"
      :fire-base-columns="['name', 'code']"
      @submit="handleREIT"
    />

    <h4 class="q-mb-none">ETFs</h4>
    <ImportStepper
      :sending="sending"
      :fire-base-columns="['name', 'code']"
      @submit="handleETF"
    />
  </q-page>
</template>
