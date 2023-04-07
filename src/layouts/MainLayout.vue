<template>
  <q-layout view="lHr lpR lFr">
    <q-header reveal :height-hint="10" class="bg-light text-accent">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Finance App </q-toolbar-title>

        <div class="user-img">
          <img
            :src="this.avatar"
            alt="User Logged"
            @click="toggleRightDrawer"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left">
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <q-btn @click="toggleRightDrawer">Fechar</q-btn>
      <pre>{{ this.user }}</pre>
    </q-drawer>

    <q-page-container class="bg-light">
      <router-view />
    </q-page-container>

    <!-- <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import EssentialLink from "src/components/Navigation/EssentialLink.vue";
import { useAuthStore } from "src/stores/auth";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
    external: true,
  },
  {
    title: "Home",
    caption: "Inicio do site",
    icon: "home",
    link: { name: `home` },
  },
  {
    title: "Balanço",
    caption: "Gastos e Ganhos",
    icon: "currency_exchange",
    link: { name: `balance` },
  },
  {
    title: "Independência",
    caption: "Liberdade Financeira",
    icon: "insights",
    link: { name: `freedom` },
  },
  {
    title: "Dados IPCA",
    caption: "Consulte os dados do IPCA",
    icon: "la la-digital-tachograph",
    link: { name: `ipca` },
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false),
      rightDrawerOpen = ref(false),
      { avatar, user } = useAuthStore();

    return {
      avatar,
      user,
      essentialLinks: linksList,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.q-drawer.q-drawer--left) {
  width: 280px !important;
  margin: 0.5rem;
  border-radius: 1rem;
}
.user-img img {
  display: flex;
  max-height: 45px;
  border-radius: 2rem;
}
</style>
