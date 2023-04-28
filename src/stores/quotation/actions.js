import National from "src/repositories/Quotation/National"

export async function load(symbols) {
  this.loading = true
  if (symbols.length === 0) this.list = [];

  if (symbols.length > 0) {
    await National.fetchQuote(symbols)
      .then(response => this.list = response.stocks)
      .catch((error) => console.error(`Error On Load Quotations`) && console.error(error));;
  }
  this.loading = false
}
