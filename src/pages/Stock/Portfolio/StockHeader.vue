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
          'text-positive': item.averagePrice < item.close,
          'text-negative': item.averagePrice > item.close,
          'text-grey': item.averagePrice === item.close,
        }"
      >
        {{ $formaters.money(item.averagePrice) }}
      </span>
    </q-item-label>
  </q-item-section>
  <q-item-section>
    <q-item-label>
      {{ item.quantity }}
    </q-item-label>
  </q-item-section>
  <q-item-section>
    <q-item-label>
      <q-badge
        rounded
        :color="
          item.change > 0 ? 'positive' : item.change < 0 ? 'negative' : 'grey'
        "
      >
        <q-icon
          :name="
            item.change > 0
              ? 'la la-arrow-up'
              : item.change < 0
              ? 'la la-arrow-down'
              : 'la la-minus'
          "
        />
        {{ (parseFloat(item.change) || 0).toFixed(2) }}%
      </q-badge>
    </q-item-label>
  </q-item-section>
</template>
