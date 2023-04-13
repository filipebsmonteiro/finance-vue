<template>
  <div v-if="Array.isArray(items) && items.length === 0" class="flex">
    <p class="q-my-md q-mx-auto">
      {{ emptyText }}
    </p>
  </div>
  <q-list v-else-if="expansible">
    <q-expansion-item
      v-for="(item, index) in items"
      :key="index"
      :class="{
        'bg-white rounded overflow-hidden q-mb-xs': true,
        [item.classes]: true,
      }"
    >
      <template v-slot:header>
        <slot name="header" v-bind="{ item, index }" />
      </template>
      <slot v-bind="{ item, index }" />
    </q-expansion-item>
  </q-list>
  <q-list v-else>
    <q-item
      v-for="(item, index) in items"
      :key="index"
      :class="{
        'bg-white q-py-xs q-px-md q-mb-xs rounded overflow-hidden flex items-center': true,
        [item.classes]: true,
      }"
    >
      <slot v-bind="{ item, index }" />
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "ListSimple",
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
  },
};
</script>
