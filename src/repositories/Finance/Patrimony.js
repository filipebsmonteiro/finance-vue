import { Repository } from "src/repositories/Base/Repository";
import { child, get, ref, set } from "firebase/database";
import Firebase from "src/boot/firebase";
import { useAuthStore } from "src/stores/auth";

const auth = useAuthStore();
const userId = auth.getUser.uid; // Firebase.auth.currentUser.uid;
const patrimonyRef = ref(Firebase.database, `patrimony/${userId}`);

class Patrimony extends Repository {
  async fetch() {
    return new Promise(async (resolve, reject) => {
      await get(child(ref(Firebase.database), `patrimony/${userId}`))
        .then((snapshot) => {
          if (snapshot.exists()) resolve(parseFloat(snapshot.val()))
          resolve(0);
        })
        .catch(error => reject(error));
    })
  }

  post(params) {
    return set(patrimonyRef, params)
  }

}

export default new Patrimony()
