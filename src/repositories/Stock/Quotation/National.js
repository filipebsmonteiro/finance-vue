import { Repository } from "src/repositories/Base/Repository";

/**
 * Link:
 * https://brapi.dev/docs
 */
export class National extends Repository {
  constructor() {
    super();

    this.endpoint = `https://brapi.dev/api`
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
