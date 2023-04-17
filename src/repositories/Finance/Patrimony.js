import { FirebaseRepository } from "src/repositories/Firebase/FirebaseRepository";

class Patrimony extends FirebaseRepository {
  constructor() {
    super(`patrimony/$userId`);
    this.oneToMany = false;
  }

}

export default new Patrimony()
