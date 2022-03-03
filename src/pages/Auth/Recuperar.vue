<template>
  <q-card class="q-pa-lg shadow-4 rounded-borders login-card card-blur">
    <div class="row justify-center">
      <div class="logo-wrapper">
        <q-img src="~/assets/logo.png" width="100%" />
      </div>
    </div>
    <q-card-section class="q-mt-lg">
      <q-form autocorrect="on" class="flex" @submit.prevent="onSubmit">
        <q-input
          outlined
          dense
          v-model="email"
          label="Email"
          bg-color="white"
          class="q-mb-md fit"
          :rules="[required, validEmail]"
        />
        <q-btn
          color="brand"
          class="fit"
          type="submit"
          no-caps
          :loading="sending"
          >Enviar email para mudar senha</q-btn
        >
        <router-link
          class="text-primary q-mx-auto q-mt-sm"
          :to="{ name: $CONST.routes.login.name }"
          >Login</router-link
        >
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import Login from "src/repositories/Auth/Login";
import ValidationsMixin from "src/mixins/ValidationsMixin";

export default {
  name: "Recuperar",
  mixins: [ValidationsMixin],
  data() {
    return {
      email: null,
      sending: false,
    };
  },
  methods: {
    async onSubmit() {
      this.sending = true;
      try {
        await Login.sendRecoveryEmail({ email: this.email });
        this.$q.notify({
          color: "positive",
          message: "Recebemos sua solicitação!",
        });
        this.$q.notify({
          message: "Caso seja um e-mail válido lhe enviaremos um link!",
        });

        await this.$router.push({ name: this.$CONST.routes.login.name });
      } catch (e) {
        // suppress
      }
      this.sending = false;
    },
  },
};
</script>

<style scoped></style>
