import National from "src/repositories/Stock/Quotation/National"
import { usePortfolioStore } from "src/stores/portfolio";
import { useREITStore } from "src/stores/reit";
import { useETFStore } from "src/stores/etf";

export async function autocomplete(term) {
  this.loading = true
  await National.autocomplete(term)
    .then(response => this.autocompleteOptions = response.stocks);
  this.loading = false
}

export async function loadPortfolioQuotations() {
  this.loading = true
  const { groupedBySymbol: portfolioList } = usePortfolioStore(),
    symbols = Object.keys(portfolioList).filter((stock, idx, array) => array.indexOf(stock) === idx); // Filter removing duplicates

  // When Delete last on portfolio
  if (symbols.length === 0) this.list = [];

  if (symbols.length > 0) {
    const REITStore = useREITStore(),
      ETFStore = useETFStore();
    await Promise.all([REITStore.load(), ETFStore.load()]);

    await National.fetchQuote(symbols)
      .then(response => {
        let portfolioAmount = 0, categoryAmount = {};

        const list = stocks.map(code => {
          let quantity = 0, averagePrice = 0, result = 0, amount = 0;
          const quotation = response.stocks.find(s => s.stock === code);
          const contributions = portfolioList[code].map(c => {
            quantity += c.quantity;
            amount += c.value * c.quantity;
            result += quotation ? (quotation.close - c.value) * c.quantity : 0;

            return {
              id: c.id,
              date: c.date,
              quantity: c.quantity,
              value: c.value,
              amount: c.value * c.quantity,
              result: quotation ? (quotation.close - c.value) * c.quantity : 0
            }
          });
          averagePrice = amount / quantity;
          portfolioAmount += amount;

          const category = REITStore.onlySymbols.includes(code)
            ? `REIT`
            : ETFStore.onlySymbols.includes(code)
              ? `ETF`
              : `STOCK`;
          categoryAmount[category] = categoryAmount[category] ? categoryAmount[category] + amount : amount;

          return {
            code,
            contributions,
            averagePrice,
            quantity,
            result,
            amount,
            category,
            logo: quotation?.logo,
            name: quotation?.name,
            sector: quotation?.sector,
            quotation: {
              change: quotation?.change,
              close: quotation?.close,
            }
          };
        }).filter(stock => stock && stock.quantity > 0);

        this.list = list.map(stock => ({
          ...stock,
          percentInPortfolio: ((stock.amount * 100) / portfolioAmount),
          percentInCategory: ((stock.amount * 100) / categoryAmount[stock.category]),
        }))

      })
  }
  // .catch((error) => console.error(`Error On Load Stocks Quotations`) && console.error(error));;
  this.loading = false
}

export function $resetAutoComplete() {
  this.autocompleteOptions = [
    "PETR4",
    "VALE3",
    "BBDC4",
    "ITUB4",
    "IVVB11"
  ];
}