<template>
  <!-- <q-layout view="hHh lpR fFf" class="bg-dark text-white"> -->
  <q-layout view="hHh lpR fFf" class="bg-light">
    <!-- <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->

    <Header v-if="$route && $route.name && $route.name === 'dashboard'">
      <div class="flex justify-between q-ml-sm q-mr-md">
        <p class="q-mb-sm text-bold">{{ "" }}</p>
        <p class="q-mb-sm">
          <strong>600 </strong>
          <span class="text-grey">/ 1000 Pontos</span>
        </p>
      </div>
      <q-linear-progress rounded size="20px" :value="0.6" />
      <template v-slot:logout><p class="text-transparent">.</p></template>
    </Header>
    <Header v-else>
      <h1
        v-if="$route && $route.meta && $route.meta.title"
        id="page-title"
        class="text-bold q-mx-auto q-my-none"
      >
        {{ $route.meta.title }}
      </h1>
    </Header>

    <q-page-container class="container-mobile">
      <router-view />
    </q-page-container>

    <q-footer class="bg-footer text-grey q-py-sm">
      <q-toolbar class="flex justify-around">
        <q-btn
          flat
          round
          dense
          stack
          no-caps
          color="footer"
          icon="home"
          label="Home"
          :to="{ name: $route.name === 'dashboard' ? '' : 'dashboard' }"
        />
        <q-btn
          flat
          round
          dense
          stack
          no-caps
          color="footer"
          icon="las la-vial"
          label="Exames"
          :to="{ name: 'exames' }"
        />
        <q-btn
          flat
          round
          dense
          stack
          no-caps
          color="footer"
          icon="vaccines"
          label="Vacinas"
          :to="{ name: '' }"
        />
        <q-fab flat vertical-actions-align="right" direction="up">
          <template v-slot:icon>
            <q-btn
              flat
              round
              dense
              stack
              no-caps
              color="footer"
              icon="menu"
              label="Mais"
              class="adjust-fab-footer"
            />
          </template>
          <q-fab-action
            color="footer"
            text-color="footer"
            icon="logout"
            label="Logout"
            @click="logout"
          />
          <q-fab-action
            color="footer"
            text-color="footer"
            icon="published_with_changes"
            label="Mudar Cor"
            @click="changeColors"
          />
          <q-fab-action
            color="footer"
            text-color="footer"
            icon="o_badge"
            label="Carteirinha"
            :to="{ name: constants.routes.carteirinha.name }"
          />
        </q-fab>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import Header from "src/components/layout/Header";
import UserInfoMixin from "src/mixins/UserInfoMixin";
import CONSTANTS from "src/boot/providers/constants";
import { mapMutations } from "vuex";
import { colors, getCssVar, setCssVar } from "quasar";

export default {
  name: "AppLayout",
  mixins: [UserInfoMixin],
  components: { Header },
  data() {
    return {
      constants: CONSTANTS,
    };
  },
  methods: {
    ...mapMutations([
      "auth/setExpirationDate",
      "auth/setAccessToken",
      "auth/setRefreshToken",
    ]),
    async logout() {
      this.$q.loading.show();
      this["auth/setExpirationDate"](null);
      this["auth/setAccessToken"](null);
      this["auth/setRefreshToken"](null);
      this.$q.localStorage.remove(CONSTANTS.localStorage.AUTH_TOKEN);
      this.$q.localStorage.remove(CONSTANTS.localStorage.AUTH_EXPIRATION);
      await this.$router.push({ name: CONSTANTS.routes.login.name });
      this.$q.loading.hide();
    },
    changeColors() {
      if (
        getCssVar("brand-bg-start") === "#232526" ||
        getCssVar("brand-bg-start") === null
      ) {
        // Tá Preto Ou nullo muda pra Amarelo
        setCssVar("brand-bg-start", "#2f80ed");
        setCssVar("brand-bg-end", "#56ccf2");
        setCssVar("brand-text", "#5695d5");

        setCssVar("footer-bg-start", "#fff");
        setCssVar("footer-bg-end", "#fff");
        setCssVar("footer-text", "#5695d5");
        return;
      }

      if (getCssVar("brand-bg-start") === "#f7971e") {
        // Tá amarelo muda pra Preto
        setCssVar("brand-bg-start", "#232526");
        setCssVar("brand-bg-end", "#414345");
        setCssVar("brand-text", "#232526");

        // setCssVar("footer-bg-start", "#f7971e");
        // setCssVar("footer-bg-end", "#ffd200");
        setCssVar("footer-text", "#232526");
        return;
      }

      if (getCssVar("brand-bg-start") === "#2f80ed") {
        // Tá azul muda pra amarelo
        setCssVar("brand-bg-start", "#f7971e");
        setCssVar("brand-bg-end", "#ffd200");
        setCssVar("brand-text", "#f7b41e");

        // setCssVar("footer-bg-start", "#f7971e");
        // setCssVar("footer-bg-end", "#ffd200");
        setCssVar("footer-text", "#f7b41e");
      }

      // const { lighten } = colors;
      // const newStartActionColor = lighten(getCssVar("brand-bg-start"), -10);
      // setCssVar("brand-bg-start", newStartActionColor);
    },
  },
  mounted() {
    this.changeColors();
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.q-linear-progress) {
  .q-linear-progress__model {
    background: var(--q-brand-bg-start); /* fallback for old browsers */
    // background: -webkit-linear-gradient(to left, #5b86e5, #36d1dc);
    background: -webkit-linear-gradient(
      to left,
      var(--q-brand-bg-start),
      var(--q-brand-bg-end)
    );
    background: linear-gradient(
      to left,
      var(--q-brand-bg-start),
      var(--q-brand-bg-end)
    );

    // pseudo-element shine animation left side
    &::before {
      content: "";
      display: block;
      position: absolute;
      background: rgba(255, 255, 255, 0.5);
      width: 100px;
      height: 100%;
      transform: translateX(-100px) skewX(-15deg);
    }
  }

  &:hover {
    .q-linear-progress__model {
      // pseudo-elements for right- and left-side shine animations
      &::before {
        // ,
        // &::after {
        // transform: translateX(200px) skewX(-15deg);
        transform: translateX(200vw) skewX(-15deg);
        transition: 1s;
      }
    }
  }
}

.adjust-fab-footer {
  margin-top: -11px;
  margin-left: -5px;
}
</style>
