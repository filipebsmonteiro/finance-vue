import { defineStore } from 'pinia';
import IPCA1705 from 'src/repositories/IBGE/IPCA/IPCA1705';
import IPCA7060 from 'src/repositories/IBGE/IPCA/IPCA7060';

export const useIPCAStore = defineStore('ipca', {
  state: () => ({
    columns: {},
    list: [],
  }),
  getters: {
    getColumns: (state) => {
      let columns = [];
      for (const [key, value] of Object.entries(state.columns)) {
        if (
          key.slice(-1) === 'C' ||  // Hide Codes Columns
          key === 'D1N' || // Hide Territory Column
          key === 'NN' ||  // Hide Territory Column
          key === 'D4N'    // Hide Groups Column
        ) {
          continue;
        }

        columns.push({
          // name: key,
          field: key,
          label: value,
          // sortable: true,
          // align: "left",
        })
      }
      return columns;
    },
  },
  actions: {
    load({ table }) {
      if (table === 1705) {
        IPCA1705.load({})
          .then((response) => {
            const data = JSON.parse(response);
            this.columns = data.shift();
            this.list = data;
          })
      }

      if (table === 7060) {
        IPCA7060.load({})
          .then((response) => {
            const data = JSON.parse(response);
            this.columns = data.shift();
            this.list = data;
          })
      }

    },
  },
});
