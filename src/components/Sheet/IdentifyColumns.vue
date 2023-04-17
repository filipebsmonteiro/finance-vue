<script setup>
import { onMounted, reactive } from "vue";

const props = defineProps({
  fileColumns: Array,
  fireBaseColumns: Array,
  sending: Boolean,
});
const emit = defineEmits(["submit"]);

let form = reactive({});

onMounted(() => props.fireBaseColumns.map((c) => (form[c] = null)));
</script>

<template>
  <q-form
    class="flex justify-between items-center q-my-sm full-width"
    @submit.prevent="emit('submit', form)"
  >
    <q-select
      v-for="column in fireBaseColumns"
      v-model="form[column]"
      :key="column"
      :label="`Coluna que representa: ${column}`"
      :options="fileColumns"
      :disabled="fileColumns === 0"
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
