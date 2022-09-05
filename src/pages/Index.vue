<template>
  <q-page class="flex column q-ma-sm">
    <h2 v-if="user && user.name" class="text-bold q-my-sm">
      Olá, {{ $formaters.firstName(this.user.name) }}!
    </h2>
    <p v-if="user && user.gender" class="q-ml-sm">
      Seja bem-vind{{ this.user.gender === "F" ? "a" : "o" }}!
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from "pinia";

export default defineComponent({
  name: "PageIndex",
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
});
</script>
