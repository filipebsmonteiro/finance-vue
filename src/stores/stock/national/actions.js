import National from "src/repositories/Stock/Quotation/National"
import { usePortfolioStore } from "src/stores/portfolio";

export async function autocomplete(term) {
  this.loading = true
  await National.autocomplete(term)
    .then(response => this.autocompleteOptions = response.stocks);
  this.loading = false
}

export async function loadPortfolioQuotations() {
  this.loading = true
  const { groupedByStock: portfolioList } = usePortfolioStore(),
    stocks = Object.keys(portfolioList).filter((stock, idx, array) => array.indexOf(stock) === idx); // Filter removing duplicates

  // When Delete last on portfolio
  if (stocks.length === 0) this.list = [];

  if (stocks.length > 0)
    await National.fetchQuote(stocks)
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

          const category = code.endsWith(`11`) ? `FII` : `STOCK`;
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