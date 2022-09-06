
import { Repository } from "src/repositories/Base/Repository";
import { axios } from "src/boot/axios";

// O IPCA-E tem periodicidade mensal, mas sua divulgação é trimestral, ocorrendo
// sempre ao fim de cada trimestre civil (março, junho, setembro e dezembro). O
// IPCA-E tem abrangência geográfica e população-objetivo iguais ao IPCA, mas
// período de coleta diferente (aproximadamente do dia 16 do mês anterior ao dia 15
// do mês de referência).

class IBGERepository extends Repository {
  endpoint = 'https://apisidra.ibge.gov.br';
  $axios = axios;

  loadIPCA1419() {
    return this.cleanRequest(
      'GET',
      `${this.endpoint}/values/t/1419/n1/all/v/all/p/all/c315/7169,7170,7445,7486,7558,7625,7660,7712,7766,7786/d/v63%202,v66%204,v69%202,v2265%202?formato=json`
    );
  }

  // https://dados.gov.br/dataset/ia-indice-nacional-de-precos-ao-consumidor-amplo-ipca/resource/007cdefd-a819-4841-90c1-c2b7bf8ffbfc
  //http://landpage-h.cgu.gov.br/dadosabertos/index.php?url=http://api.sidra.ibge.gov.br/values/t/1419/n1/all/v/all/p/all/c315/7169,7170,7445,7486,7558,7625,7660,7712,7766,7786/d/v63%202,v66%204,v69%202,v2265%202?formato=json
  //https://apisidra.ibge.gov.br/values/t/1705/n1/all/v/all/p/all/c315/7169/d/v355%202,v356%202,v357%204,v1120%202?formato=json

  // D4C: "Geral, grupo, subgrupo, item e subitem (Código)" | D4N: "Geral, grupo, subgrupo, item e subitem"
  // 7169 | Índice geral

  // D2C: "Variável (Código)" | D2N: "Variável"
  // 355   |  IPCA15 - Variação mensal |v355%202,v356%202
  // 356   |  IPCA15 - Variação acumulada no ano |v356%202
  // 357   |  IPCA15 - Peso mensal |v357%204
  // 1120  |  IPCA15 - Variação acumulada em 12 meses |v1120%202
  loadIPCA1705() {
    return this.cleanRequest(
      'GET',
      `${this.endpoint}/values/t/1705/n1/all/v/all/p/all/c315/7169/d/v355%202?formato=json`
    );
  }

  loadConjunturais() {
    const now = new Date();
    let months = '';

    for (let i = 12; i > 0; i--) {
      const past = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months += `,${past.getFullYear()}${String(past.getMonth() + 1).padStart(2, "0")}`;
    }

    // OLD URL
    // ipca: { abbrev: "IPCA", table: 1737, var: 2266,
    // ipca15: abbrev: "IPCA-15", table: 3065, var: 1117,
    const index = 3065;
    const variation = 1117;
    return this.cleanRequest(
      'GET',
      `https://servicodados.ibge.gov.br/api/v1/conjunturais?&d=s&user=ibge&t=${index}&v=${variation}&p=${months.substring(1)}&ng=1(1)&c=`
    );
  }
}

export default new IBGERepository()
