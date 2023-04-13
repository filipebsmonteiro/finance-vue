import { Repository } from "src/repositories/Base/Repository";

/**
 * Link:
 * https://www.alphavantage.co/documentation/
 */
export class Internacional extends Repository {
  constructor() {
    super();

    this.$APIKey = `QWIMIEXNHSL3B9UK`;

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
  /**
   *
   * @param {SYMBOL} null
   * @param {config} {TIME_SERIES, INTERVAL}
   * @param {API_KEY} demo
   * @returns
   */
  fetch(SYMBOL, CONFIG = {}) {
    const { TIME_SERIES = `TIME_SERIES_INTRADAY`, INTERVAL = `60min`, DATA_TYPE = `json` } = CONFIG;

    return this.cleanRequest(
      `GET`,
      `https://www.alphavantage.co/query?function=${TIME_SERIES}&symbol=${SYMBOL}&interval=${INTERVAL}&apikey=${this.$APIKey}&datatype=${DATA_TYPE}`,
      // { Authorization: this.$APIKey }
    ).then((result) => {
      console.log('result :>> ', result);
    }).catch((err) => {
      console.error('err :>> ', err);
    });
  }
}

export default new Internacional()
