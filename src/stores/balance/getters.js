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
  getTotal() {
    return this.getTotalIncomes - this.getTotalCosts;

    if (balance <= 0) {
      Notify.create({
        type: "negative",
        message:
          "Seus ganhos são menores que suas dívidas! Você não terá independência financeira!",
      });
    }

  }
}
