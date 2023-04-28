export default () => ({
  loading: false,
  autocompleteOptions: [],
  categories: [
    // Renda Variável
    { value: `REIT`, label: `Fundo de Investimento Imbobiliário` },
    { value: `ETF`, label: ` ETF (Exchange Traded Fund)` },
    { value: `STOCK`, label: `Ações` },
    { value: `EXCHANGE`, label: `Moedas` },
    { value: `COMMODITIES`, label: `Commodities` },
    { value: `DERIVADOS`, label: `Derivados (Futuros, Opções, etc.)` },

    // Renda Fixa
    { value: `TESOURO`, label: `Tesouro Direto` },
    { value: `CDB`, label: `Carta Depósito Bancário` },
    { value: `CDI`, label: `CDI - Renda Fixa` },
    { value: `LCI`, label: `Letra de Crédito Imobibliário` },
    { value: `LCA`, label: `Letra de Crédito do Agronegócio` },
  ],
  userCategoryTargets: []
})
