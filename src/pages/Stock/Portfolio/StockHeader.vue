<script setup>
import { defineProps } from "vue";
defineProps({
  item: Object,
});
</script>

<template>
  <q-item-section side>
    <q-avatar size="40px">
      <q-img v-if="item.logo" :src="item.logo" />
      <div
        v-else
        class="absolute-full flex flex-center bg-grey rounded text-white"
      >
        {{ item.stock[0].toUpperCase() }}
      </div>
    </q-avatar>
  </q-item-section>
  <q-item-section side>{{ item.stock }}</q-item-section>
  <q-item-section>{{ item.name }}</q-item-section>
  <q-item-section>
    <q-item-label>
      <span
        :class="{
          'text-caption': true,
          'text-positive': item.change > 0,
          'text-negative': item.change < 0,
        }"
        >{{ $formaters.money(item.close) }}
      </span>
    </q-item-label>
  </q-item-section>
  <q-item-section>
    <q-item-label>
      <q-badge
        rounded
        :color="item.change > 0 ? 'positive' : 'negative'"
        @click="double(`patrimony`)"
      >
        <q-icon
          :name="item.change > 0 ? 'la la-arrow-up' : 'la la-arrow-down'"
        />
        {{ parseFloat(item.change).toFixed(2) }}%
      </q-badge>
    </q-item-label>
  </q-item-section>
</template>
