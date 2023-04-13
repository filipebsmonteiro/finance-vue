import { Repository } from "src/repositories/Base/Repository";

/**
 * Link:
 * https://brapi.dev/docs
 */
export class National extends Repository {
  constructor() {
    super();

    this.endpoint = `https://brapi.dev/api`

    this.$APIKey = `QWIMIEXNHSL3B9UK`;

    this.$TIME_SERIES = {
      Intraday: `1d`,
      Daily: `TIME_SERIES_DAILY`,
      Weekly: `TIME_SERIES_WEEKLY`,
      Monthly: `TIME_SERIES_MONTHLY`,
    };

    // range 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max
  }

  async autocomplete(term) {
    return this.cleanRequest(`GET`, `${this.endpoint}/available?search=${term}`)
  }

  async fetchQuote(stocks) {
    if (stocks && Array.isArray(stocks)) stocks = stocks.join("|");

    return this.cleanRequest(`GET`, `${this.endpoint}/quote/list?&search=${stocks}`);
  }
}

export default new National()
