import { date } from "quasar";

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

export default {
  listComplete: (state) => {
    const {
      expenses,
      expenseInPercent,
      incomes,
      investmentInPercent,
      max: maxMonths,
      patrimony: patrimonyInitial,
    } = state;

    // TODO: Validar melhor com negativos oque pode impedir a independencia
    // if (incomes === 0 && expenseGrowth === 0 && investmentGrowth === 0) {
    //   return [];
    // }

    const balance = incomes - expenses;
    let records = [],
      month = date.buildDate(Date.now()),
      monthCounter = 0,
      expenseWithInflation = expenses,
      investmentIncome = 0,
      patrimony = patrimonyInitial;
    while (monthCounter < maxMonths) {
      expenseWithInflation = parseFloat(
        (expenseWithInflation + (expenseWithInflation * expenseInPercent)).toFixed(2)
      );
      investmentIncome = parseFloat((patrimony * investmentInPercent).toFixed(2));
      patrimony += parseFloat((balance + investmentIncome).toFixed(2));

      records.push({
        patrimony,
        expenseWithInflation,
        investmentIncome,
        month: date.formatDate(month, "MMMM", { months: monthsInPTBR }),
        year: date.formatDate(month, "YYYY", { months: monthsInPTBR }),
      });

      monthCounter++;
      month = date.addToDate(month, { months: 1 })
    }

    return records;
  },
  monthsToIndependence() {
    return this.listComplete.filter((l) => l.investmentIncome < l.expenseWithInflation).length;
  },
}
