import { useBalanceStore } from "src/stores/balance";
import { useIPCAStore } from "src/stores/ipca";

export default {
  reset() {
    const balance = useBalanceStore();
    const ipca = useIPCAStore();

    this.simulation.inflation = ipca.getLastMonthsAverage;  // Inflaçao acumulada 12 Meses
    this.simulation.investment = 0.92;  // Retorno médio sobre os investimentos

    this.patrimony = balance.patrimony;
    this.incomes = balance.getTotalIncomes;
    this.costs = balance.getTotalCosts;
    this.costInPercent = this.simulation.inflation / 100;
    this.investmentInPercent = this.simulation.investment / 100;
  },
  loadList(quantity) {
    console.log('this.listComplete :>> ', this.listComplete);
    if (quantity) {
      this.list = this.listComplete.slice(0, quantity)
      return
    }

    this.list = this.listComplete.filter(row => row.investmentIncome < row.costWithInflation)
  }
}
