import { Repository } from "src/repositories/Base/Repository";

const relativePercentageDifference = (a, b) => {
  let percent;
  if (b !== 0) {
    if (a !== 0) {
      percent = (b - a) / a * 100;
    } else {
      percent = b * 100;
    }
  } else {
    percent = - a * 100;
  }
  return Math.floor(percent);
};

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
            updatedCodes = [{ from: `WIZS3`, to: `WIZC3` }];
          if (updatedCodes.some(u => u.from === stock)) stock = updatedCodes.find(u => u.from === stock).to
          return `${prefix}${stock}${sufix}`
        }).join("|");

      return new Promise((resolve, reject) => {
        this.cleanRequest(`GET`, `${this.endpoint}/quotes?&symbols=${stocks}`)
          .then(result => {
            let quotations = [];
            Object.values(result).map(data => {
              quotations.push({
                stock: data.price.symbol.replace(`.SA`, ``),
                logo: null,
                name: data.price.longName,
                sector: null,
                change: relativePercentageDifference(
                  data.price.regularMarketPreviousClose,
                  data.price.regularMarketPrice
                ),
                close: data.price.regularMarketPrice,
              })
            });
            resolve({ stocks: quotations });
          })
          .catch(reject);
      })
    }

    return this.cleanRequest(`GET`, `${this.endpoint}/quotes?&symbol=${stocks}`);
  }
}

export default new National()
