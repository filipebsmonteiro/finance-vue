import { date } from "quasar";
import { useBalanceStore } from "src/stores/balance";

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
];

const balance = useBalanceStore();

export default {
  list: (state) => {
    let patrimony = state.patrimony;
    const { incomes, costs, costGrowth, investmentGrowth } = state;

    // TODO: Validar melhor com negativos oque pode impedir a independencia
    if (incomes === 0 && costGrowth === 0 && investmentGrowth === 0) {
      return [];
    }

    const balance = incomes - costs;
    let records = [];
    let month = date.buildDate(Date.now());
    let monthCounter = 0;
    let costWithInflation = costs;
    let investimentIncome = 0;
    state.month.independency = 0;

    while (monthCounter < state.month.simulator && monthCounter < state.month.max) {
      costWithInflation = parseFloat(
        (costWithInflation + (costWithInflation * costGrowth)).toFixed(2)
      );
      investimentIncome = parseFloat((patrimony * investmentGrowth).toFixed(2));
      patrimony += parseFloat((balance + investimentIncome).toFixed(2)) // Adicionar investimentIncome é juros compostos

      if (state.month.independency === 0 && investimentIncome >= costWithInflation) {
        state.month.independency = monthCounter;
        // 90% quando atinge e carrega mais 10%
        const hundred = parseInt((monthCounter * 100) / 90);
        //state.month.simulator = hundred;
      }

      records.push({
        patrimony,
        costWithInflation,
        investimentIncome,
        month: date.formatDate(month, "MMMM", { months: monthsInPTBR }),
        year: date.formatDate(month, "YYYY", { months: monthsInPTBR }),
      });

      monthCounter++;
      month = date.addToDate(month, { months: 1 })
    }

    state.current = monthCounter;

    return records;
  },
  // TODO: Find Solution
  getTotalCosts: () => balance.getTotalCosts,
  getTotalIncomes: () => balance.getTotalIncomes
}
