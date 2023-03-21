
import { Repository } from "src/repositories/Base/Repository";
import { axios } from "src/boot/axios";

class IBGERepository extends Repository {
  constructor() {
    this.endpoint = 'https://apisidra.ibge.gov.br';
    this.$axios = axios;
  }
}

export default new IBGERepository()
