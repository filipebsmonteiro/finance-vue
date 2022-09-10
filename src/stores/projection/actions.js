import { useBalanceStore } from "src/stores/balance";

export default {
  reset() {
    const balance = useBalanceStore();

    this.patrimony = balance.patrimony;
    this.incomes = this.getTotalIncomes;
    this.costs = this.getTotalCosts;
    this.costGrowth = this.inflation / 100; // In percentage
    this.investmentGrowth = this.investment / 100; // In percentage
    this.maxMonths = 1440; // 120 Anos
  }
}
