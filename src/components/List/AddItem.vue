<template>
  <div class="flex">
    <q-input v-model="form.name" />
    <q-input v-model="form.value" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = {
  name: ref(null),
  value: ref(0),
};
</script>
