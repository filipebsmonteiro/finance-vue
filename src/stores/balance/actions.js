import { LocalStorage } from "quasar"
import constants from "src/boot/providers/constants"

export default {
  add(object) {
    this.list.push({ ...object });
    this.persistBalances();
  },
  load() {
    this.loading = true;
    this.list = LocalStorage.getItem(constants.localStorage.FINANCE.BALANCES) || [];
    this.patrimony = LocalStorage.getItem(constants.localStorage.FINANCE.PATRIMONY) || 0;
    this.patrimony = parseFloat(this.patrimony);
    this.loading = false;
  },
  persistBalances() {
    LocalStorage.set(
      constants.localStorage.FINANCE.BALANCES,
      this.list
    );
  },
  persistPatrimony() {
    LocalStorage.set(
      constants.localStorage.FINANCE.PATRIMONY,
      this.patrimony
    );
  },
  remove(index) {
    this.list = this.list.filter((b, idx) => index !== idx);
    this.persistBalances();
  },
}

