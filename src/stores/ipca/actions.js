import IPCA from 'src/repositories/IBGE/IPCA/IPCA';
import IPCA1705 from 'src/repositories/IBGE/IPCA/IPCA1705';
import IPCA7060 from 'src/repositories/IBGE/IPCA/IPCA7060';

export default {
  load({ table }) {
    this.loading = true;
    if (table === 1705) {
      IPCA1705.fetch({})
        .then((response) => {
          const data = JSON.parse(response);
          this.columns = data.shift();
          this.list = data;
        })
    }

    if (table === 7060) {
      IPCA7060.fetch({})
        .then((response) => {
          const data = JSON.parse(response);
          this.columns = data.shift();
          this.list = data;
        })
    }
    this.loading = false;
  },
  async loadLastMonths({ quantity = 12 }) {
    this.loading = true;
    await IPCA7060.fetch({ period: IPCA.getLastMonths(quantity) })
      .then((response) => {
        const data = JSON.parse(response);
        this.columns = data.shift();
        this.list = data;
      })
    this.loading = false;
  },
}
