<script>
import Portfolio from "src/repositories/Stock/Portfolio";

export default {
  props: {
    quote: Number,
    contributions: Array,
  },
  data() {
    return {
      columns: [
        {
          name: "date",
          label: "Data da Compra",
          field: "date",
          align: "left",
          format: this.$formaters.dateExtended,
          sortable: true,
        },
        {
          name: "value",
          label: "Valor da Compra",
          field: "value",
          format: this.$formaters.money,
          sortable: true,
        },
        {
          name: "quantity",
          label: "Quantidade",
          field: "quantity",
          sortable: true,
        },
        {
          name: "gain",
          label: "Ganho",
          field: "gain",
          field: (row) => row.value - this.quote,
          format: this.$formaters.money,
          sortable: true,
        },
        {
          name: "delete",
          label: "",
          field: "delete",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    remove(id) {
      Portfolio.delete(id);
    },
  },
};
</script>

<template>
  <q-table
    flat
    :rows="contributions"
    :columns="columns"
    :rows-per-page-options="[0]"
    hide-pagination
  >
    <template v-slot:body-cell-delete="props">
      <q-td :props="props">
        <q-icon
          name="la la-trash"
          size="sm"
          color="grey"
          class="cursor-pointer"
          @click="remove(props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
  <!-- <div class="row justify-center q-mt-md">
    <q-pagination
      v-model="pagination.page"
      color="grey-8"
      :max="pagesNumber"
      size="sm"
    />
  </div> -->
</template>
