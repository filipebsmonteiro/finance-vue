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
  list: (state) => {
    const {
      costs,
      costGrowth,
      incomes,
      investmentGrowth,
      month: { simulator, max: maxMonths },
    } = state;
    let {
      patrimony,
      month: { independency },
    } = state;
    independency = 0;


    // TODO: Validar melhor com negativos oque pode impedir a independencia
    if (incomes === 0 && costGrowth === 0 && investmentGrowth === 0) {
      return [];
    }

    const balance = incomes - costs;
    let records = [],
      month = date.buildDate(Date.now()),
      monthCounter = 0,
      costWithInflation = costs,
      investimentIncome = 0;
    console.log('month :>> ', month);
    // // Cenário inicial => Tenta alcançar a independência, Sendo menor que o máximo
    // state.month.simulator === 0 && monthCounter < state.month.max
    // // Cenario simulador => Faz até o valor do simulador
    // state.month.simulator > 0 && monthCounter < state.month.simulator
    while (monthCounter < simulator && monthCounter < maxMonths) {
      costWithInflation = parseFloat(
        (costWithInflation + (costWithInflation * costGrowth)).toFixed(2)
      );
      investimentIncome = parseFloat((patrimony * investmentGrowth).toFixed(2));
      patrimony += parseFloat((balance + investimentIncome).toFixed(2));

      if (independency === 0 && investimentIncome >= costWithInflation) independency = monthCounter;

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
    console.log('independency :>> ', independency);

    return records;
  },
}
