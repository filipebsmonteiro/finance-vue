import { FirebaseRepository } from "src/repositories/Firebase/FirebaseRepository";

class Balance extends FirebaseRepository {
  constructor() {
    super(`balances`);
  }

}

export default new Balance()