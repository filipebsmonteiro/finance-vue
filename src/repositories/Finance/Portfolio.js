import { FirebaseRepository } from "src/repositories/Firebase/FirebaseRepository";

class Portfolio extends FirebaseRepository {
  constructor() {
    super(`portfolio/$userId`);
  }

}

export default new Portfolio()
