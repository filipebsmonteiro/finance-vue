
import { Repository } from "src/repositories/Base/Repository";
import { axios } from "src/boot/axios";

// O IPCA-E tem periodicidade mensal, mas sua divulgação é trimestral, ocorrendo
// sempre ao fim de cada trimestre civil (março, junho, setembro e dezembro). O
// IPCA-E tem abrangência geográfica e população-objetivo iguais ao IPCA, mas
// período de coleta diferente (aproximadamente do dia 16 do mês anterior ao dia 15
// do mês de referência).

class IBGERepository extends Repository {
  endpoint = 'https://apisidra.ibge.gov.br/';
  $axios = axios;

  // https://dados.gov.br/dataset/ia-indice-nacional-de-precos-ao-consumidor-amplo-ipca/resource/007cdefd-a819-4841-90c1-c2b7bf8ffbfc
  //http://landpage-h.cgu.gov.br/dadosabertos/index.php?url=http://api.sidra.ibge.gov.br/values/t/1419/n1/all/v/all/p/all/c315/7169,7170,7445,7486,7558,7625,7660,7712,7766,7786/d/v63%202,v66%204,v69%202,v2265%202?formato=json
  //https://apisidra.ibge.gov.br/values/t/1705/n1/all/v/all/p/all/c315/7169/d/v355%202,v356%202,v357%204,v1120%202?formato=json
  loadIPCA1419() {
    return this.cleanRequest(
      'GET',
      `${this.endpoint}/values/t/1419/n1/all/v/all/p/all/c315/7169,7170,7445,7486,7558,7625,7660,7712,7766,7786/d/v63%202,v66%204,v69%202,v2265%202?formato=json`
    );
  }

  loadIPCA1705() {
    return this.cleanRequest(
      'GET',
      `${this.endpoint}/values/t/1705/n1/all/v/all/p/all/c315/7169/d/v355%202,v356%202,v357%204,v1120%202?formato=json`
    );
  }
}

export default new IBGERepository()

//OLD URL
//https://servicodados.ibge.gov.br/api/v1/conjunturais?&d=s&user=ibge&t=1737&v=2266&p=202103,202104,202105,202106,202107,202108,202109,202110,202111,202112,202201,202202,202203&ng=1(1)&c=
