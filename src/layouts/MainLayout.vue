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

        <q-toolbar-title class="flex justify-center">
          Finance Freedom Free
        </q-toolbar-title>

        <q-avatar size="50px" @click="toggleRightDrawer">
          <img :src="this.avatar" referrerpolicy="no-referrer" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above side="left">
      <q-list>
        <!-- <q-item-label header> Essential Links </q-item-label> -->
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <q-img src="src/assets/bkg.jpg">
        <div v-if="user" class="full-width">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ user.displayName }}</div>
          <div>{{ user.email }}</div>
          <q-btn
            class="absolute-top-right rounded q-px-xs"
            color="negative"
            @click="toggleRightDrawer"
            size="sm"
            icon-right="close"
          />
        </div>
      </q-img>
      <q-scroll-area class="absolute-full">
        <q-list padding>
          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
        <pre>{{ this.user }}</pre>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-light q-px-md">
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
  {
    title: "Portfolio",
    caption: "Lista de Investimentos",
    icon: "la la-book-open",
    link: { name: `portfolio` },
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
      { avatar, user, logout } = useAuthStore();

    return {
      avatar,
      user,
      linksList,
      leftDrawerOpen,
      logout,
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
.user-img img {
  display: flex;
  max-height: 45px;
  border-radius: 2rem;
  cursor: pointer;
}
:deep(.q-drawer.q-drawer--left) {
  width: 280px !important;
  margin: 0.5rem;
  border-radius: 1rem;
}
:deep(.q-drawer.q-drawer--right) {
  .q-scrollarea {
    margin-top: 127px;
  }
}
</style>
