import National from "src/repositories/Stock/Quotation/National"
import { usePortfolioStore } from "src/stores/stock/portfolio";

export async function autocomplete(term) {
  this.loading = true
  await National.autocomplete(term)
    .then(response => this.autocompleteOptions = response.stocks);
  this.loading = false
}

export async function loadPortfolioQuotations() {
  this.loading = true
  const { list: portfolioList } = usePortfolioStore(),
    stocks = Object.keys(portfolioList);

  if (stocks.length === 0) this.list = []

  if (stocks.length > 0)
    await National.fetchQuote(stocks)
      .then(response => {
        this.list = stocks.map(code => {
          const quantity = portfolioList[code].reduce((a, c) => a + c.quantity, 0);
          const averagePrice = portfolioList[code].reduce((a, c) => a + (c.value * c.quantity), 0) / quantity; // Preço Médio

          return {
            contributions: portfolioList[code],
            averagePrice,
            quantity,
            id: portfolioList[code][0].id,
            stock: code,
            ...response.stocks.find(s => s.stock === code)
          }
        }).filter(stock => stock.quantity > 0)
      });
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