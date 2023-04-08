<template>
  <div class="full-width">
    <p class="q-mb-none">
      Projetar
      <q-badge class="q-mx-sm" rounded> {{ month.simulator }} </q-badge>
      Meses
    </p>
    <q-slider
      v-model="month.simulator"
      :min="0"
      :max="1440"
      :step="1"
      snap
      label
    />
    <p class="q-mb-none text-caption">
      Independência em:
      <b class="q-mx-xs">
        {{ parseInt(month.independency / 12) }}
      </b>
      Anos e
      <b class="q-mx-xs" rounded>
        {{ month.independency % 12 }}
      </b>
      Meses
    </p>
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import { useProjectionStore } from "src/stores/projection";

export default {
  name: "TimeSimulator",
  computed: {
    ...mapWritableState(useProjectionStore, ["month"]),
  },
};
</script>
