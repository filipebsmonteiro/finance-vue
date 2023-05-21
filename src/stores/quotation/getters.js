import { usePortfolioStore } from "src/stores/portfolio";

export default {
  consolidatedPosition: (state) => {
    const { groupedBySymbol } = usePortfolioStore(),
      symbols = Object.keys(groupedBySymbol);

    if (symbols.length === 0) return [];

    return symbols.map(code => {
      let quantity = 0, averagePrice = 0, result = 0, amount = { original: 0, actual: 0 },
        quotation = state.list.find(s => s.stock === code);

      if (!quotation) {
        quotation = groupedBySymbol[code].reduce((a, b) => a.date > b.date ? a : b); // Get Last Aport price
        quotation = { close: quotation.value };
      }
      const contributions = groupedBySymbol[code].map(c => {
        quantity += c.quantity;
        amount.original += c.value * c.quantity;
        amount.actual += quotation.close * c.quantity;
        result += (quotation.close - c.value) * c.quantity;

        return {
          id: c.id,
          date: c.date,
          quantity: c.quantity,
          value: c.value,
          amount: c.value * c.quantity,
          result: (quotation.close - c.value) * c.quantity
        }
      });
      averagePrice = quantity > 0 ? amount.original / quantity : 0;

      return {
        code,
        contributions,
        averagePrice,
        quantity,
        result,
        amount,
        logo: quotation?.logo,
        name: quotation?.name,
        sector: quotation?.sector,
        quotation: {
          change: quotation?.change,
          close: quotation?.close,
        }
      };
    }).filter(s => s.quantity > 0);
  },
}
