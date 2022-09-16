import { useBalanceStore } from "src/stores/balance";
import { useIPCAStore } from "src/stores/ipca";

export default {
  async loadIPCAIntoInflation() {
    const ipca = useIPCAStore();

    await ipca.loadLastMonths({});
    this.inflation =
      ipca.getLastMonthsAverage > 0
        ? ipca.getLastMonthsAverage
        : parseFloat(this.inflation);

    this.costGrowth = this.inflation / 100; // In percentage
    this.month.simulator = 360; // 30 Anos
  },
  reset() {
    const balance = useBalanceStore();

    this.patrimony = balance.patrimony;
    this.incomes = this.getTotalIncomes;
    this.costs = this.getTotalCosts;
    this.costGrowth = this.inflation / 100; // In percentage
    this.investmentGrowth = this.investment / 100; // In percentage
    this.month.simulator = 360; // 30 Anos
    this.month.independency = 0; // 120 Anos
  }
}
