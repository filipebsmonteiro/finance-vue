<template>
  <q-page class="flex column">
    <!-- <h2 v-if="user && user.name" class="text-bold q-my-sm">
      Olá, {{ $formaters.firstName(this.user.name) }}!
    </h2>
    <p v-if="user && user.sexo" class="q-ml-sm">
      Seja bem-vind{{ this.user.sexo === "F" ? "a" : "o" }}!
    </p> -->
    <FileUploader
      multiple
      label="Teste Arquivo"
      hint="A foto deve estar nítida, mostrando todas as informações. Fotografe e anexe."
      bg-color="white"
      :rules="[required]"
      @input="
        (event) => {
          fotos = event;
        }
      "
    />

    <h2 class="page-subtitle">investimentos</h2>
    <q-carousel
      v-model="investimentos"
      animated
      swipeable
      navigation
      transition-prev="slide-right"
      transition-next="slide-left"
      control-color="brand"
      class="card-carousel"
    >
      <q-carousel-slide v-for="index in 6" :key="index" :name="index">
        <q-card class="rounded shadow-shine">
          <q-card-section class="flex justify-between">
            <div>
              <h6 class="q-my-none text-bold">{{ index }}</h6>
              <p class="q-mb-none text-grey-6">08:00 - 9:00</p>
            </div>
            <q-btn flat color="brand" icon="edit" />
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import FileUploader from "src/components/FileUploader.vue";

export default defineComponent({
  name: "PageIndex",
  components: { FileUploader },
  data() {
    return {
      investimentos: 1,
      fotos: null
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.card-carousel) {
  background: transparent;
  height: auto;
  margin-bottom: 20px;

  .q-carousel__slide {
    padding: 10px 0;
  }

  .q-carousel__control {
    position: relative;
    display: contents;

    .q-carousel__navigation-icon--inactive {
      opacity: 0.4;
    }
  }
}
</style>
