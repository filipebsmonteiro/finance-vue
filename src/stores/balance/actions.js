import { child, get, onValue, push, ref, set } from "firebase/database";
import Firebase from "src/boot/firebase";
import { useAuthStore } from "stores/auth";

function parseBalancesObjToArray(obj) {
  return Object.entries(obj).map(([id, value]) => ({ id, ...value }));
}

export default {
  add(object) {
    this.list.push({ ...object });
    this.persistBalances();
  },
  async load() {
    this.loading = true;
    const auth = useAuthStore();

    if (auth.isLogged) {

      this.list = []
      const userId = auth.getUser.uid;

      const balancesRef = ref(Firebase.database, `balances/${userId}`);
      onValue(balancesRef, (snapshot) => this.list = parseBalancesObjToArray(snapshot.val()));
      await get(child(ref(Firebase.database), `balances/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) this.list = parseBalancesObjToArray(snapshot.val())
        }).catch((error) => console.error(`Error On Load User Balances`) && console.error(error));

      const patrimonyRef = ref(Firebase.database, `patrimony/${userId}`);
      onValue(patrimonyRef, (snapshot) => this.patrimony = parseFloat(snapshot.val()));
      await get(child(ref(Firebase.database), `patrimony/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) this.patrimony = parseFloat(snapshot.val())
        }).catch((error) => console.error(`Error On Load User Patrimony`) && console.error(error));

    }

    this.loading = false;
  },
  persistBalances() {
    const userId = Firebase.auth.currentUser.uid;
    const balancesRef = ref(Firebase.database, `balances/${userId}`);
    this.list.map(balance => {
      if (balance.id) {
        set(ref(Firebase.database, `balances/${userId}/${balance.id}`), balance)
        return
      }

      set(push(balancesRef), balance)
    });
  },
  persistPatrimony() {
    // LocalStorage.set(
    //   constants.storage.local.FINANCE.PATRIMONY,
    //   this.patrimony
    // );
    const userId = Firebase.auth.currentUser.uid;
    set(ref(Firebase.database, `patrimony/${userId}`), this.patrimony)
  },
  remove(index) {
    this.list = this.list.filter((b, idx) => index !== idx);
    this.persistBalances();
  },
}

