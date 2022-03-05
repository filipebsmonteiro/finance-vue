import { LocalStorage, Notify } from "quasar"
import constants from "src/boot/providers/constants"

export function loadMonthlyBalance({ commit }) {
  let balances = LocalStorage.getItem(
    constants.localStorage.FINANCE.BALANCES
  );

  if (balances && balances.length > 0) {
    const incomesSum = balances
      .filter((b) => b.type === constants.FINANCE.BALANCE.INCOME)
      .reduce((a, c) => a + parseFloat(c.value), 0);
    commit('setMonthlyIncome', incomesSum)

    const costsSum = balances
      .filter((b) => b.type === constants.FINANCE.BALANCE.COST)
      .reduce((a, c) => a + parseFloat(c.value), 0);
    commit('setMonthlyCost', costsSum)

    const balance = incomesSum - costsSum;
    if (balance <= 0) {
      Notify.create({
        type: "negative",
        message:
          "Seus ganhos são menores que suas dívidas! Você não terá independência financeira!",
      });
      return
    }

    commit('setMonthlyBalance', balance)
  }
}

export function loadIpcaHistory({ commit }, months) {
  IBGERepository.loadConjunturais(months)
    .then(response => commit('', response))
}
