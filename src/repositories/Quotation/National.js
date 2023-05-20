import { Repository } from "src/repositories/Base/Repository";

export class National extends Repository {
  constructor() {
    super();

    this.endpoint = `https://node-finance-api.vercel.app`
  }

  async fetchQuote(stocks) {
    if (stocks && Array.isArray(stocks)) {
      const limit = stocks.length;
      stocks = stocks
        .map(stock => {
          const prefix = ``,
            sufix = `.SA`,
            updatedCodes = [
              { from: `WIZS3`, to: `WIZC3` }
            ];
          if (updatedCodes.some(u => u.from === stock)) stock = updatedCodes.find(u => u.from === stock).to
          return `${prefix}${stock}${sufix}`
        })
        .join("|");
      return this.cleanRequest(`GET`, `${this.endpoint}/quotes?&symbols=${stocks}`);
    }

    return this.cleanRequest(`GET`, `${this.endpoint}/quotes?&symbol=${stocks}`);
  }
}

export default new National()
