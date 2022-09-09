<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Finance App </q-toolbar-title>

        <div>By Filipe Monteiro</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

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
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.q-page-container {
  background-color: #f8f9fa;
}
</style>
