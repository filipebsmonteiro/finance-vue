import { usePortfolioStore } from "src/stores/portfolio";

export default {
  consolidatedPosition: (state) => {
    const { groupedBySymbol } = usePortfolioStore(),
      symbols = Object.keys(groupedBySymbol);

    if (symbols.length === 0) return [];

    return symbols.map(code => {
      let quantity = 0, averagePrice = 0, result = 0, amount = 0;
      const quotation = state.list.find(s => s.stock === code);
      const contributions = groupedBySymbol[code].map(c => {
        quantity += c.quantity;
        amount += c.value * c.quantity;
        result += quotation ? (quotation.close - c.value) * c.quantity : 0;

        return {
          id: c.id,
          date: c.date,
          quantity: c.quantity,
          value: c.value,
          amount: c.value * c.quantity,
          result: quotation ? (quotation.close - c.value) * c.quantity : 0
        }
      });
      averagePrice = quantity > 0 ? amount / quantity : 0;

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
