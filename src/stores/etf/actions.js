import ETF from "src/repositories/Investment/Firebase/ETF";

export default {
  async load() {
    this.loading = true;

    await ETF.fetch()
      .then(response => this.list = response)
      .catch((error) => console.error(`Error On Load ETFs`) && console.error(error) && (this.list = []));

    this.loading = false;
  },
}