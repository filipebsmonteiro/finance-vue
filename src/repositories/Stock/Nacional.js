import { Repository } from "src/repositories/Base/Repository";

/**
 * Link:
 * https://brapi.dev/docs
 */
export class Nacional extends Repository {
  constructor() {
    super();

    this.$APIKey = `QWIMIEXNHSL3B9UK`;

    this.$TIME_SERIES = {
      Intraday: `1d`,
      Daily: `TIME_SERIES_DAILY`,
      Weekly: `TIME_SERIES_WEEKLY`,
      Monthly: `TIME_SERIES_MONTHLY`,
    };

    // range 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max
  }
  /**
   *
   * @param {SYMBOL} null
   * @param {config} {TIME_SERIES, INTERVAL}
   * @param {API_KEY} demo
   * @returns
   */
  fetch(SYMBOL, CONFIG = {}) {
    const { TIME_SERIES = `1d`, INTERVAL = `60min`, FUNDAMENTAL_DATA = true } = CONFIG;

    return this.cleanRequest(
      `GET`,
      `https://brapi.dev/api/quote/${SYMBOL}?range=${TIME_SERIES}&interval=${INTERVAL}&fundamental=${FUNDAMENTAL_DATA}`,
    ).then((result) => {
      console.log('result :>> ', result);
    });
  }
}

export default new Nacional()
