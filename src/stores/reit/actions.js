import REIT from "src/repositories/Investment/Firebase/REIT";

export default {
  async load() {
    this.loading = true;

    await REIT.fetch()
      .then(response => this.list = response)
      .catch((error) => console.error(`Error On Load REITs`) && console.error(error) && (this.list = []));

    this.loading = false;
  },
}