import { LocalStorage, Notify } from "quasar"
import constants from "src/boot/providers/constants"

export default {
  add(object) {
    this.list.push({ ...object });
    this.persistBalances();
  },
  load() {
    this.list = LocalStorage.getItem(constants.localStorage.FINANCE.BALANCES);
  },
  persistBalances() {
    LocalStorage.set(
      constants.localStorage.FINANCE.BALANCES,
      this.list
    );
  },
  remove(index) {
    this.list = this.list.filter((b, idx) => index !== idx);
    this.persistBalances();
  },
}

export function loadIpcaHistory({ commit }, months) {
  IBGERepository.loadConjunturais(months)
    .then(response => commit('', response))
}
