<script setup>
defineProps({ item: Object });
</script>

<template>
  <q-item-section side>
    <q-avatar size="40px">
      <q-img v-if="item.logo" :src="item.logo" />
      <span
        v-else
        class="absolute-full flex flex-center bg-grey rounded text-white"
      >
        {{ item.code[0].toUpperCase() }}
      </span>
    </q-avatar>
  </q-item-section>
  <q-item-section side>{{ item.code }}</q-item-section>
  <q-item-section v-if="$q.screen.gt.sm">{{ item.name }}</q-item-section>
  <q-item-section>
    <q-item-label>
      <span
        :class="{
          'text-caption': true,
          'text-positive': item.result > 0,
          'text-negative': item.result < 0,
          'text-grey': item.result === 0,
        }"
      >
        {{ $formaters.money(item.result) }}
      </span>
    </q-item-label>
  </q-item-section>
  <q-item-section v-if="$q.screen.gt.sm">
    <q-item-label>{{ item.quantity }}</q-item-label>
  </q-item-section>
  <q-item-section>
    <q-item-label>
      <q-badge
        rounded
        :color="
          item.quotation.change > 0
            ? 'positive'
            : item.quotation.change < 0
            ? 'negative'
            : 'grey'
        "
      >
        <q-icon
          :name="
            item.quotation.change > 0
              ? 'la la-arrow-up'
              : item.quotation.change < 0
              ? 'la la-arrow-down'
              : 'la la-minus'
          "
        />
        {{ (parseFloat(item.quotation.change) || 0).toFixed(2) }}%
      </q-badge>
    </q-item-label>
  </q-item-section>
  <!-- <q-item-section>
    <q-item-label lines="1" caption>
      <span class="text-black">{{ item.percentInPortfolio.toFixed(2) }}%</span>
      na carteira
    </q-item-label>
    <q-item-label lines="1" caption>
      <span class="text-black">{{ item.percentInCategory.toFixed(2) }}%</span>
      na categoria
    </q-item-label>
  </q-item-section> -->
</template>
