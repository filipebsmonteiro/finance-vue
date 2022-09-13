export default () => {
  return {
    patrimony: 0,
    incomes: 0,
    costs: 0,
    costGrowth: 0,
    investmentGrowth: 0,
    month: {
      max: 1440, // 120 Anos
      simulator: 360, // 30 anos
      independency: 0,
    },
    investment: 0.92, // Retorno mensal sobre o invetimento
    inflation: 0.5, // Inflação mensal
  };
}
