import { onValue, ref } from "firebase/database";
import Firebase from "src/boot/firebase";
import Balance from "src/repositories/Finance/Balance";
import Patrimony from "src/repositories/Finance/Patrimony";
import { useAuthStore } from "stores/auth";

const auth = useAuthStore();
const userId = auth.getUser.uid; // Firebase.auth.currentUser.uid;
const balancePath = `balances/${userId}`;
const balancesRef = ref(Firebase.database, `${balancePath}`);
const patrimonyRef = ref(Firebase.database, `patrimony/${userId}`);

export default {
  add(object) {
    this.list.push({ ...object });
    this.persistBalances();
  },
  async load() {
    this.loading = true;

    if (auth.isLogged) {
      this.list = []

      // Read Balances
      await Balance.fetch()
        .then(response => this.list = response)
        .catch((error) => console.error(`Error On Load User Balances`) && console.error(error));

      // Read Patrimony
      await Patrimony.fetch()
        .then(value => this.patrimony = value)
        .catch((error) => console.error(`Error On Load User Patrimony`) && console.error(error));

      // Detect Changes
      onValue(balancesRef, (snapshot) => this.list = Balance.parseBalancesObjToArray(snapshot.val()));
      onValue(patrimonyRef, (snapshot) => this.patrimony = parseFloat(snapshot.val()));
    }

    this.loading = false;
  },
  persistBalances() {
    this.list.map(balance => {
      if (balance.id) {
        Balance.put(balance.id, balance)
      } else {
        Balance.post(balance)
      }
    });
  },
  persistPatrimony() {
    Patrimony.post(this.patrimony)
  },
  remove(id) {
    this.list = this.list.filter(balance => id !== balance.id);
    Balance.delete(id)
  },
}

