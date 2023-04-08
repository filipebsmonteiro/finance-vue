<template>
  <q-page class="flex column q-ma-sm">
    <section class="flex items-center justify-between q-my-md">
      <div class="flex items-center">
        <span class="rounded-pill q-pa-sm bg-white q-mr-md">
          <q-icon name="insights" size="md" />
        </span>
        <p class="q-mb-none font-weight-medium">Overview</p>
      </div>

      <q-badge v-if="user?.displayName" class="q-mx-sm" color="dark" rounded>
        Olá, {{ this.user.displayName }}!
      </q-badge>
    </section>

    <div class="card-list card-list-2">
      <q-card class="rounded" flat>
        <div class="flex items-center">
          <span class="rounded q-pa-xs bg-grey-3 q-mr-md">
            <q-icon name="las la-money-bill-wave" size="md" color="positive" />
          </span>
          <div class="text-weight-medium">
            <p class="q-mb-none">R$ 100,00</p>
            <p class="text-grey-6 q-mb-none">
              <span class="text-grey-7">Ganhos</span>
              Totais
            </p>
          </div>
        </div>
        <div>
          <q-badge class="q-mx-sm" color="positive" rounded> Mensal </q-badge>
        </div>
      </q-card>

      <q-card class="rounded" flat>
        <div class="flex items-center">
          <span class="rounded q-pa-xs bg-grey-3 q-mr-md">
            <q-icon name="las la-money-bill-wave" size="md" color="negative" />
          </span>
          <div class="text-weight-medium">
            <p class="q-mb-none">R$ 100,00</p>
            <p class="text-grey-6 q-mb-none">
              <span class="text-grey-7">Gastos</span>
              Totais
            </p>
          </div>
        </div>
        <div>
          <q-badge class="q-mx-sm" color="negative" rounded> Mensal </q-badge>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";
import { mapState } from "pinia";

export default defineComponent({
  name: "PageIndex",
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
});
</script>

<style lang="scss">
.card-list-2 {
  .q-card {
    align-items: center;
    justify-content: space-between;
  }
}
</style>
