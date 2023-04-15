import { Repository } from "src/repositories/Base/Repository";

/**
 * Link:
 * https://www.alphavantage.co/documentation/
 */
export class Internacional extends Repository {
  constructor() {
    super();

    this.$APIKey = `QWIMIEXNHSL3B9UK`;

    // Our standard API call frequency is 5 calls per minute and 500 calls per day
    this.endpoint = `https://www.alphavantage.co/query?apikey=${this.$APIKey}&function=`

    this.$TIME_SERIES = {
      Intraday: `TIME_SERIES_INTRADAY`,
      IntradayExtended: `TIME_SERIES_INTRADAY_EXTENDED`,
      Daily: `TIME_SERIES_DAILY`,
      DailyAdjusted: `TIME_SERIES_DAILY_ADJUSTED`,
      Weekly: `TIME_SERIES_WEEKLY`,
      WeeklyAdjusted: `TIME_SERIES_WEEKLY_ADJUSTED`,
      Monthly: `TIME_SERIES_MONTHLY`,
      MonthlyAdjusted: `TIME_SERIES_MONTHLY_ADJUSTED`,
    };

    // interval 1min, 5min, 15min, 30min, 60min
  }

  async autocomplete(term) {
    return this.cleanRequest(`GET`, `${this.endpoint}SYMBOL_SEARCH&keywords=${term}`)
  }

  async fetchQuote(stocks) {
    if (stocks && Array.isArray(stocks)) {
      return Promise.all([
        ...stocks.map(stock => this.cleanRequest(`GET`, `${this.endpoint}SYMBOL_SEARCH&keywords=${stock}.SAO`)),
        ...stocks.map(stock => this.cleanRequest(`GET`, `${this.endpoint}GLOBAL_QUOTE&symbol=${stock}.SAO`))
      ]);
    }

    return this.cleanRequest(`GET`, `${this.endpoint}GLOBAL_QUOTE&symbol=${stocks}.SAO`);
  }
}

export default new Internacional()
