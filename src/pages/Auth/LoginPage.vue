<template>
  <div class="card-blur">
    <q-tabs v-model="tab" class="">
      <q-tab
        name="google"
        icon="lab la-google"
        label="Google"
        @click="login(`google`)"
      />
      <q-tab
        name="facebook"
        icon="facebook"
        label="Facebook"
        @click="login(`facebook`)"
      />
      <q-tab name="apple" icon="apple" label="Apple" @click="login(`apple`)" />
      <q-tab
        name="github"
        icon="lab la-github"
        label="GitHub"
        @click="login(`github`)"
      />
      <q-tab
        name="microsoft"
        icon="lab la-microsoft"
        label="Microsoft"
        @click="login(`microsoft`)"
      />
      <q-tab
        name="twitter"
        icon="lab la-twitter"
        label="Twitter"
        @click="login(`twitter`)"
      />
    </q-tabs>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useAuthStore } from "stores/auth";

export default {
  data: () => ({
    tab: null,
  }),
  methods: {
    ...mapActions(useAuthStore, {
      storeLogin: `login`,
      logout: `logout`,
    }),
    async login(provider) {
      await this.storeLogin(provider);
      this.$router.push({ name: `home` });
    },
  },
};
</script>
