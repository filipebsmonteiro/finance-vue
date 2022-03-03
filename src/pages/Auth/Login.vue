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
        <q-input
          outlined
          dense
          v-model="senha"
          label="Senha"
          bg-color="white"
          class="q-mb-md fit"
          :rules="[required]"
          :type="password_visible ? 'text' : 'password'"
        >
          <template v-slot:append>
            <q-icon
              :name="password_visible ? 'visibility_off' : 'visibility'"
              @click="password_visible = !password_visible"
              class="cursor-pointer"
            />
          </template>
        </q-input>
        <q-btn color="brand" class="fit" type="submit" :loading="sending"
          >Login</q-btn
        >
        <router-link
          class="text-primary q-mx-auto q-mt-sm"
          :to="{ name: 'auth.recuperar' }"
          >Esqueci minha Senha?</router-link
        >
        <router-link
          class="text-primary q-mx-auto q-mt-sm"
          :to="{ name: 'register' }"
          >Cadastrar</router-link
        >
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ValidationsMixin from "src/mixins/ValidationsMixin";

export default {
  name: "Login",
  mixins: [ValidationsMixin],
  computed: {
    ...mapGetters({
      isUserLoggedIn: "auth/isLogged",
    }),
  },
  data() {
    return {
      email: null,
      senha: null,
      password_visible: false,
      sending: false,
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    async onSubmit() {
      this.sending = true;
      await this.login({ email: this.email, senha: this.senha });
      this.sending = false;

      if (this.isUserLoggedIn) {
        await this.$router.push({ name: "" });
      }
    },
  },
};
</script>
