import { Notify } from "quasar";
import constants from "src/boot/providers/constants"

export default {
  getTotalCosts: (state) => {
    const balances = state.list;
    if (balances && balances.length > 0) {
      return balances
        .filter((b) => b.type === constants.FINANCE.BALANCE.COST)
        .reduce((a, c) => a + parseFloat(c.value), 0);
    }

    return 0;
  },
  getTotalIncomes: (state) => {
    const balances = state.list;
    if (balances && balances.length > 0) {
      return balances
        .filter((b) => b.type === constants.FINANCE.BALANCE.INCOME)
        .reduce((a, c) => a + parseFloat(c.value), 0);
    }

    return 0;
  },
  getBalance: () => this.getTotalIncomes - this.getTotalCosts
}
