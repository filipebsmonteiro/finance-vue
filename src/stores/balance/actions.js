import Balance from "src/repositories/Finance/Balance";
import Patrimony from "src/repositories/Finance/Patrimony";

export default {
  add(object) {
    this.list.push({ ...object });
    this.persistBalances();
  },
  async load() {
    this.loading = true;
    this.list = []

    // Read Balances
    await Balance.fetch()
      .then(response => this.list = response)
      .catch((error) => console.error(`Error On Load User Balances`) && console.error(error));

    // Read Patrimony
    await Patrimony.fetch()
      .then(value => this.patrimony = value)
      .catch((error) => console.error(`Error On Load User Patrimony`) && console.error(error));

    this.loading = false;
  },
  persistBalances() {
    this.list.map(balance => {
      if (balance.id) {
        Balance.put(balance.id, balance)
      } else {
        Balance.post(balance)
      }
    });
  },
  persistPatrimony() {
    Patrimony.post(this.patrimony)
  },
  remove(id) {
    this.list = this.list.filter(balance => id !== balance.id);
    Balance.delete(id)
  },
}
