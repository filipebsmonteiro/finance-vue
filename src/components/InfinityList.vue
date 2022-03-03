<template>
  <div class="flex column">
    <div v-if="loading && items.length === 0">
      <div
        v-if="filtersSize && filtersSize > 0"
        class="flex justify-center q-mt-sm q-mb-lg"
      >
        <q-skeleton
          v-for="key in filterSize"
          :key="key"
          type="QChip"
          class="shadow-1 q-py-md q-mr-md"
        />
      </div>
      <q-skeleton
        v-for="key in pagination.page.size"
        :key="key"
        type="rect"
        class="shadow-1 q-py-md q-mb-md"
      />
    </div>
    <p v-if="!loading && items.length === 0" class="q-my-md q-mx-auto">
      {{ emptyText }}
    </p>

    <q-list v-if="expansible" class="q-mt-lg flex column fit">
      <q-expansion-item
        v-for="(item, idx) in items"
        :key="idx"
        :class="{
          'fit shadow-clickable bg-white rounded-borders q-my-sm': true,
          [item.classes]: true,
        }"
      >
        <template v-slot:header>
          <slot name="header" v-bind="item" />
        </template>
        <slot v-bind="item" />
      </q-expansion-item>
    </q-list>
    <q-list v-else class="q-mt-lg flex column fit">
      <q-item v-for="(item, idx) in items" :key="idx">
        <slot v-bind="item" />
      </q-item>
    </q-list>

    <q-spinner-dots
      v-if="loading && items.length > 0"
      color="primary"
      class="q-mx-auto q-mb-xl"
      size="4em"
    />
    <q-btn
      v-if="pagination.page.number < pagination.last_page && !loading"
      rounded
      no-caps
      color="brand"
      class="q-mx-auto q-my-lg"
      label="Carregar mais"
      @click="$emit('load')"
    />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Object,
      required: true,
      validator(pagination) {
        return (
          pagination.hasOwnProperty("last_page") &&
          pagination.hasOwnProperty("page") &&
          pagination.page.hasOwnProperty("size")
        );
      },
    },
    loading: {
      type: Boolean,
      required: true,
    },
    expansible: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      required: true,
      default: "Nenhum dado Encontrado!",
    },
    filtersSize: {
      type: Number,
      default: 0,
    },
  },
};
</script>
