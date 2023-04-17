import { FirebaseRepository } from "src/repositories/Firebase/FirebaseRepository";

class ETF extends FirebaseRepository {
  constructor() {
    super(`etfs`);

  }

}

export default new ETF()
