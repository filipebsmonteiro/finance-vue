import { onValue } from "firebase/database";
import { groupBy } from "src/boot/providers";
import Portfolio from "src/repositories/Stock/Portfolio";

export default {
  async load(realTimeListener = false) {
    this.loading = true;
    this.list = []

    // TODO: Agrupar todos os aportes por ativo
    await Portfolio.fetch()
      .then(response => this.list = groupBy(response, `code`))
      .catch((error) => console.error(`Error On Load User Portfolio`) && console.error(error));

    if (realTimeListener)
      onValue(Portfolio.firebaseRef, (snapshot) => {
        const json = Portfolio.parseBalancesObjToArray(snapshot.val())
        this.list = groupBy(json, `code`)
      });


    this.loading = false;
  },
  // remove(id) {
  //   this.list = this.list.filter(balance => id !== balance.id);
  //   Balance.delete(id)
  // },
}