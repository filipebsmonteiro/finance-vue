import { FirebaseRepository } from "src/repositories/Firebase/FirebaseRepository";

class REIT extends FirebaseRepository {
  constructor() {
    super(`reits`);
  }

}

export default new REIT()
