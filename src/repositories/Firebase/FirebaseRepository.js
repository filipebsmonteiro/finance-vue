import { Repository } from "src/repositories/Base/Repository";
import { child, get, push, ref, remove, set } from "firebase/database";
import Firebase from "src/boot/firebase";
import { useAuthStore } from "src/stores/auth";

export class FirebaseRepository extends Repository {
  constructor(path) {
    super();
    const auth = useAuthStore();
    this.userId = auth.getUser.uid; // Firebase.auth.currentUser.uid;

    if (!path) console.error(`Defina o Path para a Classe que herda FirebaseRepository`);
    this.firebasePath = path.includes('$userId')
      ? path.split('$userId').join(`${this.userId}`)
      : path;
    this.firebaseRef = ref(Firebase.database, `${this.firebasePath}`);
    this.oneToMany = true;
  }

  parseObjToArray(obj) {
    return Object.entries(obj).map(([id, value]) => ({ id, ...value }));
  }

  async fetch() {
    return new Promise(async (resolve, reject) => {
      await get(child(ref(Firebase.database), `${this.firebasePath}`))
        .then((snapshot) => {
          if (this.oneToMany) {
            if (snapshot.exists()) resolve(this.parseObjToArray(snapshot.val()));
            resolve([]);
          }

          if (snapshot.exists()) resolve(snapshot.val());
          resolve(null);
        })
        .catch(error => reject(error));
    })
  }

  post(params) {
    if (Array.isArray(params)) {
      return params.map(childToBeAdded => {
        return set(push(this.firebaseRef), childToBeAdded);
      })
    }

    if (this.oneToMany) return set(push(this.firebaseRef), params)

    return set(this.firebaseRef, params)
  }

  put(id, params) {
    return set(ref(Firebase.database, `${this.firebasePath}/${id}`), params)
  }

  delete(id) {
    return remove(ref(Firebase.database, `${this.firebasePath}/${id}`))
  }

}
