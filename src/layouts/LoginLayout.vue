<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page
        :class="{
          'flex column flex-center bg-theme': true,
          'bg-parceiro': parceiro,
        }"
        :style="`background-image: url('${background}');`"
      >
        <h4 v-if="$route.meta && $route.meta.title" class="">
          {{ $route.meta.title }}
        </h4>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LoginLayout",
  computed: {
    background() {
      if (this.parceiro)
        return require("src/assets/parceiros/" + this.parceiro + ".png");

      return require("src/assets/veus/bkg-veusinho-cropped.jpg");
    },
  },
  data() {
    return {
      parceiro: null,
    };
  },
  mounted() {
    if (this.$route.query && this.$route.query.parceiro) {
      this.parceiro = this.$route.query.parceiro;
    }
  },
};
</script>

<style scoped>
.bg-theme {
  background-color: #c4c4c4 !important;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: right;
  background-size: 25% auto;
  -o-background-size: 25% auto;
  -webkit-background-size: 25% auto;
  -moz-background-size: 25% auto;
}

@media screen and (max-width: 680px) {
  .bg-theme {
    background-position-y: bottom;
    background-size: 40% auto;
    -o-background-size: 40% auto;
    -webkit-background-size: 40% auto;
    -moz-background-size: 40% auto;
  }
}

:deep(.card-blur) {
  background-color: rgba(0, 0, 0, 0.1) !important;
  box-shadow: none;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 20px;
}

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
