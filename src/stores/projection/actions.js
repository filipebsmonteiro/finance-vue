import { useIPCAStore } from "src/stores/ipca";

export default {
  async loadInflation() {
    const { getLastMonthsAverage, loadLastMonths } = useIPCAStore();

    await loadLastMonths({});
    this.inflation = getLastMonthsAverage;

    this.costGrowth = this.inflation / 100; // In percentage
  },
  reset() {
    this.costGrowth = this.inflation / 100; // In percentage
    this.investmentGrowth = this.investment / 100; // In percentage
    this.month.simulator = 360; // 30 Anos
    this.month.independency = 0; // 120 Anos
  }
}
