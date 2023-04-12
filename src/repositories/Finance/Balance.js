import { Repository } from "src/repositories/Base/Repository";
import { child, get, push, ref, remove, set } from "firebase/database";
import Firebase from "src/boot/firebase";
import { useAuthStore } from "src/stores/auth";

const auth = useAuthStore();
const userId = auth.getUser.uid; // Firebase.auth.currentUser.uid;
const balancePath = `balances/${userId}`;
const balancesRef = ref(Firebase.database, `${balancePath}`);

class Balance extends Repository {
  parseBalancesObjToArray(obj) {
    return Object.entries(obj).map(([id, value]) => ({ id, ...value }));
  }

  async fetch() {
    return new Promise(async (resolve, reject) => {
      await get(child(ref(Firebase.database), `${balancePath}`))
        .then((snapshot) => {
          if (snapshot.exists())
            resolve(this.parseBalancesObjToArray(snapshot.val()));
          resolve([]);
        })
        .catch(error => reject(error));
    })
  }

  post(params) {
    return set(push(balancesRef), params)
  }

  put(id, params) {
    return set(ref(Firebase.database, `${balancePath}/${id}`), params)
  }

  delete(id) {
    return remove(ref(Firebase.database, `${balancePath}/${id}`))
  }

}

export default new Balance()
