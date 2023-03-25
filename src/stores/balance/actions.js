import { child, get, onValue, push, ref, remove, set } from "firebase/database";
import Firebase from "src/boot/firebase";
import { useAuthStore } from "stores/auth";

function parseBalancesObjToArray(obj) {
  return Object.entries(obj).map(([id, value]) => ({ id, ...value }));
}

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

      // Detect Changes
      onValue(balancesRef, (snapshot) => this.list = parseBalancesObjToArray(snapshot.val()));

      // Read Balances
      await get(child(ref(Firebase.database), `${balancePath}`))
        .then((snapshot) => {
          if (snapshot.exists()) this.list = parseBalancesObjToArray(snapshot.val())
        }).catch((error) => console.error(`Error On Load User Balances`) && console.error(error));

      // Read Patrimony
      onValue(patrimonyRef, (snapshot) => this.patrimony = parseFloat(snapshot.val()));
      await get(child(ref(Firebase.database), `patrimony/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) this.patrimony = parseFloat(snapshot.val())
        }).catch((error) => console.error(`Error On Load User Patrimony`) && console.error(error));

    }

    this.loading = false;
  },
  persistBalances() {
    this.list.map(balance => {
      if (balance.id) {
        set(ref(Firebase.database, `${balancePath}/${balance.id}`), balance)
        return
      }

      set(push(balancesRef), balance)
    });
  },
  persistPatrimony() {
    set(patrimonyRef, this.patrimony)
  },
  remove(id) {
    this.list = this.list.filter(balance => id !== balance.id);
    remove(ref(Firebase.database, `${balancePath}/${id}`));
  },
}

