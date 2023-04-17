import { Repository } from "src/repositories/Base/Repository";
// import { ETFs } from "src/repositories/Stock/Data/National";

/**
 * Link:
 * https://brapi.dev/docs
 */
export class National extends Repository {
  constructor() {
    super();

    this.endpoint = `https://brapi.dev/api`
  }

  getCategory(stock) {
    let category = null;
    // switch (stock) {
    //   case ETFs.includes(stock):
    //     category = `ETF`;
    //     break;
    // }
  }

  async autocomplete(term) {
    return this.cleanRequest(`GET`, `${this.endpoint}/available?search=${term}`)
  }

  async fetchQuote(stocks) {
    if (stocks && Array.isArray(stocks)) {
      const limit = stocks.length;
      stocks = stocks.join("|");
      return this.cleanRequest(`GET`, `${this.endpoint}/quote/list?&search=${stocks}&limit=${limit}`);
    }

    return this.cleanRequest(`GET`, `${this.endpoint}/quote/list?&search=${stocks}`);
  }
}

export default new National()
