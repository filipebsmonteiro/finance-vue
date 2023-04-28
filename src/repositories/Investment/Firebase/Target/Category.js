import { FirebaseRepository } from "src/repositories/Firebase/FirebaseRepository";

class TargetCategory extends FirebaseRepository {
  constructor() {
    super(`target/category/$userId`);
  }

}

export default new TargetCategory()
