import { FirebaseRepository } from "src/repositories/Firebase/FirebaseRepository";

class Balance extends FirebaseRepository {
  constructor() {
    super(`balances/$userId`);
  }

}

export default new Balance()
