<script setup>
defineProps({
  item: Object,
  hideLogo: {
    type: Boolean,
    default: false,
  },
  hideCode: {
    type: Boolean,
    default: false,
  },
  hideName: {
    type: Boolean,
    default: false,
  },
  hideResult: {
    type: Boolean,
    default: false,
  },
  hideQuantity: {
    type: Boolean,
    default: false,
  },
  hideQuotationChange: {
    type: Boolean,
    default: false,
  },
  hidePercentInPortfolio: {
    type: Boolean,
    default: false,
  },
  hidePercentInCategory: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <q-item-section v-if="!hideLogo" side>
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
  <q-item-section v-if="!hideCode" side>{{ item.code }}</q-item-section>
  <q-item-section v-if="$q.screen.gt.sm && !hideName">
    {{ item.name }}
  </q-item-section>
  <q-item-section v-if="!hideResult">
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
  <q-item-section v-if="$q.screen.gt.sm && !hideQuantity">
    <q-item-label>{{ item.quantity }}</q-item-label>
  </q-item-section>
  <q-item-section v-if="!hideQuotationChange">
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
  <q-item-section v-if="!hidePercentInPortfolio">
    <q-item-label lines="1" caption>
      <span class="text-black">
        {{ item.percentInPortfolio.toFixed(2).replace(`.`, `,`) }}%
      </span>
      na carteira
    </q-item-label>
  </q-item-section>
  <q-item-section v-if="!hidePercentInCategory">
    <q-item-label lines="1" caption>
      <span class="text-black">
        {{ item.percentInCategory.toFixed(2).replace(`.`, `,`) }}%
      </span>
      na categoria
    </q-item-label>
  </q-item-section>
</template>
