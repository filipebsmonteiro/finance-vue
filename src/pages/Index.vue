<template>
  <q-page class="flex column q-ma-sm">
    <h2 v-if="user?.displayName" class="text-bold q-my-sm">
      Olá, {{ this.user.displayName }}!
    </h2>
    <pre>{{ this.user }}</pre>
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
