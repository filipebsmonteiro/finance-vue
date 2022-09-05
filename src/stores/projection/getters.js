import { date } from "quasar";
import { useBalanceStore } from "src/stores/balance";

export default {
  list: (state) => {
    const balance = useBalanceStore();
    const costGrowth = state.inflation / 100; // In percentage
    const investmentGrowth = state.investment / 100; // In percentage
    const monthsInPTBR = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]

    let records = [];
    let monthCounter = 0;
    let capital = 0;
    let costWithInflation = balance.getTotalCosts;
    let investimentIncome = 0;
    let month = date.buildDate(Date.now());

    while (
      (state.untilFreedom && investimentIncome < costWithInflation) ||
      (
        (!state.untilFreedom && monthCounter < state.currentMonths) &&
        (!state.untilFreedom && monthCounter < state.maxMonths)
      )
    ) {
      costWithInflation = parseFloat(
        (costWithInflation + (costWithInflation * costGrowth)).toFixed(2)
      );
      investimentIncome = parseFloat((capital * investmentGrowth).toFixed(2));
      capital += parseFloat((balance.getTotal + investimentIncome).toFixed(2)) // Adicionar investimentIncome é juros compostos

      // Keep months to Freedom
      if (state.untilFreedom && investimentIncome >= costWithInflation) {
        state.currentMonths = monthCounter;
      }

      records.push({
        capital,
        costWithInflation,
        investimentIncome,
        month: date.formatDate(month, "MMMM", { months: monthsInPTBR }),
        monthCounter,
        year: date.formatDate(month, "YYYY", { months: monthsInPTBR }),
      });

      monthCounter++;
      month = date.addToDate(month, { months: 1 })
    }

    return records;
  },
}
