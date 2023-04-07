export default () => {
  return {
    investment: 0.92, // Retorno mensal sobre o invetimento
    inflation: 0, // Inflação mensal
    investmentGrowth: 0,
    costGrowth: 0,

    month: {
      max: 1440, // 120 Anos
      simulator: 0,
      independency: 0,
    },
  };
}
