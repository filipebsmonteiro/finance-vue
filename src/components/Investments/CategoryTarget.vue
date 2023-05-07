<script>
import { mapActions, mapState } from "pinia";
import InputList from "src/components/InputList.vue";
import TargetCategory from "src/repositories/Investment/Firebase/Target/Category";
import { useInvestmentStore } from "src/stores/investment";

export default {
  components: {
    InputList,
  },
  computed: {
    ...mapState(useInvestmentStore, ["categories", "userCategoryTargets"]),
    fields() {
      return [
        {
          component: `q-select`,
          label: `Categoria`,
          key: `category`,
          options: this.categories,
          optionValue: `value`,
          class: `full-width ellipsis`,
          filled: true,
          dense: true,
          emitValue: true,
          mapOptions: true,
        },
        {
          component: `q-input`,
          label: `Meta`,
          key: `target`,
          type: `number`,
          min: 0,
          append: { icon: "percentage" },
          dense: true,
          filled: true,
          debounce: 1000,
        },
      ];
    },
    values() {
      return this.userCategoryTargets.map((record) => ({
        id: record.id,
        category: record.category,
        target: record.target,
      }));
    },
  },
  methods: {
    ...mapActions(useInvestmentStore, ["loadUserCategoryTargets"]),
    persist(element) {
      const { id, ...rest } = element;
      if (id) {
        TargetCategory.put(id, rest);
      } else {
        TargetCategory.post({
          category: rest.category || "STOCK",
          target: rest.target || 0,
        });
      }

      this.loadUserCategoryTargets();
    },
  },
  mounted() {
    this.loadUserCategoryTargets();
  },
};
</script>

<template>
  <InputList :fields="fields" :values="values" @update:model-value="persist" />
</template>

<style lang="scss" scoped>
.q-expansion-item--expanded {
  // .shadow-1
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
:deep(.q-field__control > .q-field__control-container) {
  overflow: hidden;
}
// Append Prepend Icons
:deep(.material-icons) {
  display: inline;
  max-width: 1.5rem;
}
</style>
