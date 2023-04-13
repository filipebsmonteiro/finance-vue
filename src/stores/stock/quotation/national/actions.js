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

  await National.fetchQuote(stocks)
    .then(response => {
      this.list = stocks.map(code => {
        return {
          contributions: portfolioList[code],
          id: portfolioList[code][0].id,
          stock: code,
          ...response.stocks.find(s => s.stock === code)
        }
      })
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