import { onValue } from "firebase/database";
import Portfolio from "src/repositories/Stock/Portfolio";

export default {
  async load(realTimeListener = false) {
    this.loading = true;
    this.list = []

    await Portfolio.fetch()
      .then(response => this.list = response)
      .catch((error) => console.error(`Error On Load User Portfolio`) && console.error(error));

    if (realTimeListener)
      onValue(Portfolio.firebaseRef, (snapshot) => (this.list = Portfolio.parseBalancesObjToArray(snapshot.val())));


    this.loading = false;
  },
  // remove(id) {
  //   this.list = this.list.filter(balance => id !== balance.id);
  //   Balance.delete(id)
  // },
}