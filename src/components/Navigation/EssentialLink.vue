<template>
  <q-item
    clickable
    :tag="external ? `a` : `router-link`"
    :target="external ? `_blank` : null"
    :href="external ? link : undefined"
    :to="external ? undefined : link"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    external: {
      type: Boolean,
      default: false,
    },

    link: {
      type: [String, Object],
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>
