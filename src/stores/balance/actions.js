import { push, ref, set } from "firebase/database";
import { LocalStorage } from "quasar"
import Firebase from "src/boot/firebase";
import constants from "src/boot/providers/constants"

export default {
  add(object) {
    this.list.push({ ...object });
    this.persistBalances();
  },
  load() {
    this.loading = true;
    this.list = LocalStorage.getItem(constants.storage.local.FINANCE.BALANCES) || [];
    this.patrimony = LocalStorage.getItem(constants.storage.local.FINANCE.PATRIMONY) || 0;
    this.patrimony = parseFloat(this.patrimony);
    this.loading = false;
  },
  persistBalances() {
    const userId = Firebase.auth.currentUser.uid;
    const costsRef = ref(Firebase.database, 'costs');
    const incomesRef = ref(Firebase.database, 'incomes');

    this.list
      .filter((b) => b.type === constants.FINANCE.BALANCE.COST)
      .map(balance => set(push(costsRef), { ...balance, userId }));

    this.list
      .filter((b) => b.type === constants.FINANCE.BALANCE.INCOME)
      .map(balance => set(push(incomesRef), { ...balance, userId }));

    // LocalStorage.set(
    //   constants.storage.local.FINANCE.BALANCES,
    //   this.list
    // );
  },
  persistPatrimony() {
    LocalStorage.set(
      constants.storage.local.FINANCE.PATRIMONY,
      this.patrimony
    );
  },
  remove(index) {
    this.list = this.list.filter((b, idx) => index !== idx);
    this.persistBalances();
  },
}

