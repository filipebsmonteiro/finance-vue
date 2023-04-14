<template>
  <div class="full-width">
    <p class="q-mb-none">
      Projetando
      <b>{{ parseInt(simulation.months / 12) }}</b>
      Anos e
      <b>{{ simulation.months % 12 }}</b>
      Meses
    </p>
    <q-slider
      v-model="simulation.months"
      :min="0"
      :max="1440"
      :step="1"
      @update:model-value="loadList"
      snap
      label
    />
    <p class="q-mb-none text-caption">
      Independência em:
      <b class="q-mx-xs">
        {{ parseInt(monthsToIndependence / 12) }}
      </b>
      Anos e
      <b class="q-mx-xs" rounded>
        {{ monthsToIndependence % 12 }}
      </b>
      Meses
    </p>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useProjectionStore } from "src/stores/projection";

export default {
  name: "TimeSimulator",
  computed: {
    ...mapWritableState(useProjectionStore, [
      "list",
      "simulation",
      "monthsToIndependence",
    ]),
  },
  methods: {
    ...mapActions(useProjectionStore, ["loadList"]),
  },
  mounted() {
    this.simulation.months = this.list.length;
  },
};
</script>
