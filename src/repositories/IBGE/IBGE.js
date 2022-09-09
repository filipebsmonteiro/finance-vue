
import { Repository } from "src/repositories/Base/Repository";
import { axios } from "src/boot/axios";

class IBGERepository extends Repository {
  endpoint = 'https://apisidra.ibge.gov.br';
  $axios = axios;

}

export default new IBGERepository()
