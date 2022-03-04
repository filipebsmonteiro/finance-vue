<template>
  <div class="flex column">
    <div v-if="loading && items.length === 0">
      <div class="flex justify-center q-mt-sm q-mb-lg">
        <q-skeleton
          v-for="key in filtersLength"
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

    <Simple :items="items" :expansible="expansible" :empty-text="emptyText">
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </Simple>

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
import Simple from "src/components/List/Simple.vue";

export default {
  components: { Simple },
  props: {
    items: {
      type: Array,
      required: true,
    },
    expansible: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: "No data provided!",
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
    filtersLength: {
      type: Number,
      default: 0,
    },
  },
};
</script>
