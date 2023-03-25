<template>
  <q-layout view="hHh lpR fFf" class="bg-theme">
    <q-page-container>
      <q-page :class="{ 'flex column flex-center': true }">
        <h4
          v-if="$route.meta && $route.meta.title"
          class="bg-blur q-pa-md rounded"
        >
          {{ $route.meta.title }}
        </h4>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.bg-theme {
  color: #fff;
  background-color: #c4c4c4 !important;
  background-image: url("assets/bkg.jpg");
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: center;
  background-size: cover;
}

/* @media screen and (max-width: 680px) {
  .bg-theme {
    background-position-y: bottom;
    background-size: 40% auto;
    -o-background-size: 40% auto;
    -webkit-background-size: 40% auto;
    -moz-background-size: 40% auto;
  }
} */

:deep(.logo-wrapper) {
  position: absolute;
  top: -50px;
  margin: 0 auto;
  width: 100px;
  border-radius: 50% !important;
  border: 5px solid #dedee0 !important;
}

:deep(.login-card) {
  min-width: 320px;
  max-width: 320px;
}

@media screen and (max-width: 320px) {
  :deep(.login-card) {
    width: 90%;
    margin: 0 auto;
  }
}

@media screen and (orientation: landscape) {
  :deep(.login-card) {
    margin-top: 65px;
    margin-bottom: 15px;
  }
}
</style>
