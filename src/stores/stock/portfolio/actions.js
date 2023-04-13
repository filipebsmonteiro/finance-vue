import { onValue } from "firebase/database";
import { groupBy } from "src/boot/providers";
import Portfolio from "src/repositories/Stock/Portfolio";

export default {
  async load() {
    this.loading = true;

    // TODO: Agrupar todos os aportes por ativo
    await Portfolio.fetch()
      .then(response => this.list = groupBy(response, `code`))
      .catch((error) => console.error(`Error On Load User Portfolio`) && console.error(error) && (this.list = []));

    onValue(Portfolio.firebaseRef, (snapshot) => {
      if (snapshot.exists()) {
        const json = Portfolio.parseBalancesObjToArray(snapshot.val());
        this.list = groupBy(json, `code`)
      }
    });

    this.loading = false;
  },
  // remove(id) {
  //   this.list = this.list.filter(balance => id !== balance.id);
  //   Balance.delete(id)
  // },
}