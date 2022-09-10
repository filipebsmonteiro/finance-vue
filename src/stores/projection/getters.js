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

const projectFreedom = ({ patrimony = 0, incomes = 0, costs = 0, costGrowth = 0, investmentGrowth = 0, maxMonths = 0 }) => {

}

const balance = useBalanceStore();

export default {
  list: (state) => {
    console.log(state);
    let patrimony = state.patrimony;
    const incomes = state.incomes;
    const costs = state.costs;
    const costGrowth = state.costGrowth;
    const investmentGrowth = state.investmentGrowth;
    const maxMonths = state.maxMonths;

    if (patrimony === 0 && incomes === 0 && costs === 0 && costGrowth === 0 && investmentGrowth === 0 && maxMonths === 0) {
      return [];
    }

    let records = [];

    const balance = incomes - costs;
    if (balance <= 0 || investmentGrowth <= 0) {
      return records;
    }

    let month = date.buildDate(Date.now());
    let monthCounter = 0;
    let costWithInflation = costs;
    let investimentIncome = 0;

    while (monthCounter < maxMonths && investimentIncome < costWithInflation) {
      costWithInflation = parseFloat(
        (costWithInflation + (costWithInflation * costGrowth)).toFixed(2)
      );
      investimentIncome = parseFloat((patrimony * investmentGrowth).toFixed(2));
      patrimony += parseFloat((balance + investimentIncome).toFixed(2)) // Adicionar investimentIncome é juros compostos

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

    return records;
  },
  // TODO: Find Solution
  getTotalCosts: () => balance.getTotalCosts,
  getTotalIncomes: () => balance.getTotalIncomes
}
