<template>
  <q-page>
    <div class="row q-mt-md">
      <q-form class="col-12 col-md-6 offset-md-3">
        <q-select label="Tabela" v-model="model.table" :options="tables" />
        <q-select
          v-show="model.table"
          label="Meses"
          v-model="model.period"
          :options="months"
          multiple
          map-options
          emit-value
        />
        <q-select
          v-show="model.table"
          label="Variável"
          v-model="model.variable"
          :options="variables"
          multiple
          map-options
          emit-value
        />
      </q-form>
    </div>

    <q-table
      class="q-ma-md"
      :columns="getColumns"
      :rows="list"
      hide-pagination
      :rows-per-page-options="[0]"
    />
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useIPCAStore } from "src/stores/ipca";
import IPCA1705 from "src/repositories/IBGE/IPCA/IPCA1705";
import IPCA7060 from "src/repositories/IBGE/IPCA/IPCA7060";
//import LineChart from "src/components/Charts/Line.vue";

export default {
  name: "PageIndex",
  //components: { LineChart },
  computed: {
    ...mapState(useIPCAStore, ["getColumns", "list"]),
    months() {
      if (this.model.table) {
        return [
          { value: `all`, label: `Todos` },
          ...this.tables.find((t) => t.table === this.model.table.table).months,
        ];
      }
      return [{ label: "Selecione a tabela", value: null, cannotSelect: true }];
    },
    variables() {
      if (this.model.table) {
        return [
          { value: `all`, label: `Todas` },
          ...this.tables.find((t) => t.table === this.model.table.table)
            .variables,
        ];
      }
      return [{ label: "Selecione a tabela", value: null, cannotSelect: true }];
    },
  },
  data() {
    return {
      model: {
        table: null,
        period: [`all`],
        variable: undefined,
      },
      tables: [
        {
          label: `IPCA15 Fevereiro/2012 até Janeiro/2020`,
          table: IPCA1705.$table,
          months: IPCA1705.$months,
          variables: IPCA1705.$variables,
        },
        {
          label: `IPCA a partir de Janeiro/2020`,
          table: IPCA7060.$table,
          months: IPCA7060.$months,
          variables: IPCA7060.$variables,
        },
      ],
    };
  },
  watch: {
    model: {
      handler(model) {
        if (model.table) {
          this.load({ table: model.table.table });
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(useIPCAStore, ["load"]),
  },
};
</script>
