import { Repository } from "src/repositories/Base/Repository";

/**
 * Link:
 * https://brapi.dev/docs
 */
export class National extends Repository {
  constructor() {
    super();

    this.endpoint = `https://brapi.dev/api`
  }

  async autocomplete(term) {
    return this.cleanRequest(`GET`, `${this.endpoint}/available?search=${term}`)
  }

}

export default new National()
