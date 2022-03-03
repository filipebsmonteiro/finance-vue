<template>
  <div
    id="filter-exposed"
    :class="{
      flex: true,
      'filters-inline': inline,
      'show-scroll-button': isScrollable,
    }"
  >
    <h5 v-if="!hideTitle" class="q-mt-md q-my-none fit">Filtros</h5>
    <q-btn-dropdown
      v-for="(filter, idx) in local"
      v-model="filter.isOpen"
      :key="idx"
      outline
      color="brand"
      class="q-mt-sm q-mr-sm"
      :label="filter.name"
      no-caps
      rounded
    >
      <div
        v-if="filter.type === 'range'"
        class="fit q-px-lg q-py-md q-mt-lg range-filter"
      >
        <q-range
          v-model="filter.value"
          :min="filter.min"
          :max="filter.max"
          :step="filter.step"
          :left-label-value="filter.prefix + filter.value.min + filter.suffix"
          :right-label-value="filter.prefix + filter.value.max + filter.suffix"
          label-always
        />
      </div>
      <div
        v-else-if="filter.type === 'slider'"
        class="fit q-px-lg q-py-md q-mt-lg range-filter"
      >
        <q-slider
          markers
          label-always
          v-model="filter.value"
          :min="filter.min"
          :max="filter.max"
          :step="filter.step"
          :label-value="filter.prefix + filter.value + filter.suffix"
        />
      </div>
      <div
        v-else-if="filter.type === 'checkbox'"
        class="flex column q-py-sm q-pr-md"
      >
        <q-checkbox
          v-for="(option, idx) in filter.options"
          :key="idx"
          v-model="filter.value"
          :val="option.value"
          :label="option.label"
        />
      </div>
      <div
        v-else-if="filter.type === 'radiobutton'"
        class="flex column q-py-sm q-pr-md"
      >
        <q-radio
          v-for="(option, idx) in filter.options"
          :key="idx"
          v-model="filter.value"
          :val="option.value"
          :label="option.label"
        />
      </div>
      <div v-else-if="filter.type === 'number'" class="q-pa-sm">
        <q-input
          filled
          dense
          type="number"
          v-model="filter.value"
          :min="filter.min"
          :max="filter.max"
          :step="filter.step"
          :label="filter.name"
        />
      </div>
      <div v-else>
        <q-input v-model="filter.value" :label="filter.name" />
      </div>
      <div class="flex fit q-my-sm justify-around">
        <q-btn
          no-caps
          outline
          rounded
          color="brand"
          @click="resetFilter(filter)"
          >Resetar</q-btn
        >
        <q-btn no-caps rounded color="brand" @click="emitFilters(filter)"
          >Filtrar</q-btn
        >
      </div>
    </q-btn-dropdown>

    <q-btn
      v-if="isScrollable"
      flat
      size="sm"
      class="fixed bg-white btn-scroll"
      @click="scroll"
    >
      <q-icon size="lg" name="navigate_next" />
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "FilterExposed",
  props: {
    hideTitle: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    filters: {
      handler(value) {
        this.local = this.getFiltersParsed();
      },
      deep: true,
    },
  },
  data() {
    return {
      isScrollable: false,
      initial: [],
      local: [],
      actual: {},
    };
  },
  methods: {
    updateScrollable() {
      const element = document.getElementById("filter-exposed");
      const hasFilters = this.filters.length > 0;
      if (element && hasFilters) {
        let totalWidth = 0;
        for (let child of element.children) {
          totalWidth += child.offsetWidth;
        }
        this.isScrollable = element.clientWidth < totalWidth;
        this.$forceUpdate();
        return;
      }
      this.isScrollable = false;
      this.$forceUpdate();
    },
    scroll() {
      const element = document.getElementsByClassName("filters-inline")[0];
      element.scrollLeft += 20;
    },
    emitFilters(filter) {
      let accumulator = {};

      this.local.map((filtered) => {
        const original = this.initial.find((fo) => fo.key === filtered.key);
        if (original.value !== filtered.value) {
          accumulator[`${filtered.key}`] = filtered.value;
        }
      });

      this.$emit("input", accumulator);

      this.local = this.local.map((f) => {
        if (f.key === filter.key) {
          f.isOpen = false;
        }
        return f;
      });
      this.$forceUpdate();
    },
    resetFilter(filter) {
      this.local = this.local.map((filtered) => {
        if (filter.key === filtered.key) {
          return this.initial.find((fo) => fo.key === filter.key);
        }
        return filtered;
      });

      this.emitFilters(filter);
    },
    getFiltersParsed() {
      return this.filters.map((filter_prop) => {
        let filter = {};
        Object.assign(filter, filter_prop); // Deixa Prop intacta

        if (!filter.name || !filter.key) {
          throw new Error(
            `Filtro: ${
              filter.name ? filter.name : filter.key
            } deve conter attributos name e key`
          );
        }

        filter.value = "value" in filter ? filter.value : null;
        filter.isOpen = false;

        if (filter.type === "range") {
          if (!"min" in filter || !"max" in filter) {
            throw new Error(
              `Filtro: ${filter.name} deve conter valor mínimo e máximo`
            );
          }
          filter.value = filter.value
            ? filter.value
            : {
                min: filter.min,
                max: filter.max,
              };
          filter.step = filter.step ? filter.step : null;
          filter.prefix = filter.prefix ? filter.prefix : "";
          filter.suffix = filter.suffix ? filter.suffix : "";
        } else if (filter.type === "slider") {
          if (!"min" in filter || !"max" in filter) {
            throw new Error(
              `Filtro: ${filter.name} deve conter valor mínimo e máximo`
            );
          }
          filter.value = filter.value ? filter.value : filter.min;
          filter.step = filter.step ? filter.step : null;
          filter.prefix = filter.prefix ? filter.prefix : "";
          filter.suffix = filter.suffix ? filter.suffix : "";
        } else if (
          filter.type === "checkbox" ||
          filter.type === "radiobutton"
        ) {
          if (!filter.options || filter.options.length === 0) {
            throw new Error(
              `Filtro: ${filter.name} deve conter ao Mínimo 1 opção`
            );
          }
          if (filter.type === "checkbox") {
            filter.value = [];
          }
          filter.options = filter.options.map((obj) =>
            "label" in obj && "value" in obj ? obj : { label: obj, value: obj }
          );
        } else if (filter.type === "number") {
          filter.min = filter.min ? filter.min : null;
          filter.max = filter.max ? filter.max : null;
          filter.step = filter.step ? filter.step : null;
        }

        return filter;
      });
    },
  },
  mounted() {
    this.initial = this.getFiltersParsed();
    this.local = this.getFiltersParsed();

    this.updateScrollable();
    window.addEventListener("resize", this.updateScrollable);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScrollable);
  },
};
</script>

<style lang="scss" scoped>
.range-filter {
  min-width: 250px;
  @media screen and (min-width: 340px) {
    min-width: 300px;
  }
}

:deep(.btn-scroll) {
  position: absolute;
  right: 0;
  height: 45px;
  border: 1px dashed;
  border-radius: 10px;

  .q-btn__wrapper {
    padding: 0 !important;
  }
}

.filters-inline {
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;

  /* width */
  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%) !important;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: darkgrey;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 50%) !important;
  }
}

.filters-inline.show-scroll-button {
  padding-bottom: 5px;
  padding-right: 40px;
  justify-content: flex-start !important;
}
</style>
