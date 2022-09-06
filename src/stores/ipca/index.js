import { defineStore } from 'pinia';
import IBGERepository from 'src/repositories/IBGE';

export const useIPCAStore = defineStore('ipca', {
  state: () => ({
    columns: {},
    list: [],
  }),
  getters: {
    getColumns: (state) => {
      let columns = [];
      for (const [key, value] of Object.entries(state.columns)) {
        columns.push({
          //name: key,
          field: key,
          label: value,
          //align: "left",
        })
      }
      return columns;
    },
  },
  actions: {
    load() {
      //IBGERepository.loadConjunturais()
      //IBGERepository.loadIPCA1419().then(console.log) // Detalhado
      IBGERepository.loadIPCA1705()
        .then((response) => {
          const data = JSON.parse(response);
          console.log(data);
          //this.columns = data.shift();
          // this.list = data;
        })
    },
  },
});
