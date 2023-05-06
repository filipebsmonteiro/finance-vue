<script setup></script>

<template>
  <q-item class="q-py-none q-mt-lg text-uppercase" style="min-height: unset">
    <q-item-section side class="text-transparent">Image</q-item-section>
    <q-item-section side>Código</q-item-section>
    <q-item-section v-if="$q.screen.gt.sm" class="col">Nome</q-item-section>
    <q-item-section class="col">Resultado</q-item-section>
    <q-item-section v-if="$q.screen.gt.sm" class="col"
      >Quantidade</q-item-section
    >
    <q-item-section class="col">
      <q-item-label lines="1">
        Variação <span v-if="$q.screen.gt.sm">Dia</span>
      </q-item-label>
    </q-item-section>
    <!-- <q-item-section>Porcentagem</q-item-section> -->
    <q-item-section side class="text-transparent">Opt</q-item-section>
  </q-item>
</template>
