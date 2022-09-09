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
      monthCounter,
      year: date.formatDate(month, "YYYY", { months: monthsInPTBR }),
    });

    monthCounter++;
    month = date.addToDate(month, { months: 1 })
  }

  return records;
}

export default {
  list: (state) => {
    const balance = useBalanceStore();
    const costGrowth = state.inflation / 100; // In percentage
    const investmentGrowth = state.investment / 100; // In percentage

    return projectFreedom({
      patrimony: balance.patrimony,
      incomes: balance.getTotalIncomes,
      costs: balance.getTotalCosts,
      costGrowth: costGrowth,
      investmentGrowth: investmentGrowth,
      maxMonths: state.maxMonths
    });

  },
}
