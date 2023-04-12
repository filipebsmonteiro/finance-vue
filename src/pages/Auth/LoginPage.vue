<script>
import { mapActions } from "pinia";
import { useAuthStore } from "stores/auth";

export default {
  methods: {
    ...mapActions(useAuthStore, { storeLogin: `login` }),
    async login(provider) {
      await this.storeLogin(provider);
      this.$router.push({ name: `home` });
    },
  },
};
</script>

<template>
  <div class="flex column bg-blur q-pa-lg rounded">
    <q-btn
      name="google"
      icon="lab la-google"
      label="Google"
      class="bg-white text-black"
      @click="login(`google`)"
    />
    <q-btn
      name="facebook"
      icon="facebook"
      label="Facebook"
      color="primary"
      @click="login(`facebook`)"
      disable
    />
    <q-btn
      name="apple"
      icon="apple"
      label="Apple"
      color="grey-5"
      class="text-black"
      @click="login(`apple`)"
      disable
    />
    <q-btn
      name="github"
      icon="lab la-github"
      label="GitHub"
      color="black"
      @click="login(`github`)"
      disable
    />
    <q-btn
      name="microsoft"
      icon="lab la-microsoft"
      label="Microsoft"
      color="green-6"
      @click="login(`microsoft`)"
      disable
    />
    <q-btn
      name="twitter"
      icon="lab la-twitter"
      label="Twitter"
      color="info"
      @click="login(`twitter`)"
      disable
    />
  </div>
</template>

<style lang="scss" scoped>
.q-btn {
  margin-bottom: 1rem;
}
</style>
