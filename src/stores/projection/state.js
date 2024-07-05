export default () => {
  return {
    list: [],

    patrimony: 0,
    incomes: 0,
    expenses: 0,

    investmentInPercent: 0,
    expenseInPercent: 0,

    max: 1440, // 120 Anos

    simulation: {
      investment: 0.92,
      inflation: 0,
      months: 0
    }
  };
}
