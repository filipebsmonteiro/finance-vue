import { groupBy } from "src/boot/providers";
import { useETFStore } from "src/stores/etf";
import { useREITStore } from "src/stores/reit";
import { useQuotationStore } from "src/stores/quotation";

export default {
  positionCategorized() {
    const { onlySymbols: REITSymbols } = useREITStore(),
      { onlySymbols: ETFSymbols } = useETFStore(),
      { consolidatedPosition } = useQuotationStore()

    if (consolidatedPosition.length === 0) return [];

    let portfolioAmount = 0, categoryAmount = {};
    const stocks = consolidatedPosition.map(stock => {
      portfolioAmount += stock.amount.actual;

      const category = REITSymbols.includes(stock.code)
        ? `REIT`
        : ETFSymbols.includes(stock.code)
          ? `ETF`
          : `STOCK`;
      categoryAmount[category] = categoryAmount[category] ? categoryAmount[category] + stock.amount.actual : stock.amount.actual;

      return {
        ...stock,
        category,
      }
    });

    return stocks.map(stock => {
      return {
        ...stock,
        percentInPortfolio: (Math.round(stock.amount.actual * 100) / portfolioAmount),
        percentInCategory: (Math.round(stock.amount.actual * 100) / categoryAmount[stock.category]),
      }
    })
  }
}
