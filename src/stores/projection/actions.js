import { useBalanceStore } from "src/stores/balance";
import { useIPCAStore } from "src/stores/ipca";

export default {
  async loadInflation() {
    const ipca = useIPCAStore();

    await ipca.loadLastMonths({})
    this.inflation = ipca.getLastMonthsAverage;

    this.costGrowth = this.inflation / 100; // In percentage
  },
  reset() {
    const balance = useBalanceStore();

    this.patrimony = balance.patrimony;
    this.incomes = balance.getTotalIncomes;
    this.costs = balance.getTotalCosts;
    this.costGrowth = this.inflation / 100; // In percentage
    this.investmentGrowth = this.investment / 100; // In percentage
    this.month.simulator = 1440; // 120 Anos
    this.month.independency = 0;
  }
}
