import { axios } from "src/boot/axios";

// O IPCA-E tem periodicidade mensal, mas sua divulgação é trimestral, ocorrendo
// sempre ao fim de cada trimestre civil (março, junho, setembro e dezembro). O
// IPCA-E tem abrangência geográfica e população-objetivo iguais ao IPCA, mas
// período de coleta diferente (aproximadamente do dia 16 do mês anterior ao dia 15
// do mês de referência).

/**
 * Links:
 * https://sidra.ibge.gov.br/home/ipca15/brasil
 * https://apisidra.ibge.gov.br/
 * https://apisidra.ibge.gov.br/home/ajuda
 */
export class IPCA {
  constructor($axios = null) {
    this.endpoint = 'https://apisidra.ibge.gov.br';
    this.$axios = axios;
    if ($axios) {
      this.$axios = $axios
    }

    /**
     * /C315/  Geral, grupo, subgrupo, item e subitem(464)
     */
    this.$groups = [
      {
        label: `Todos`,
        value: `all`,
      },
      {
        label: `Índice geral`,
        value: 7169,
      },
      {
        label: `1.Alimentação e bebidas`,
        value: 7170,
      },
      {
        label: `2.Habitação`,
        value: 7445,
      },
      {
        label: `3.Artigos de residência`,
        value: 7486,
      },
      {
        label: `4.Vestuário`,
        value: 7558,
      },
      {
        label: `5.Transportes`,
        value: 7625,
      },
      {
        label: `6.Saúde e cuidados pessoais`,
        value: 7660,
      },
      {
        label: `7.Despesas pessoais`,
        value: 7712,
      },
      {
        label: `8.Educação`,
        value: 7766,
      },
      {
        label: `9.Comunicação`,
        value: 7786,
      },
    ];

    /**
     * Níveis Territoriais
     *
     * /N1/ Brasil(1)   Listar unidades territoriais
     * /N7/ Região Metropolitana(10)   Listar unidades territoriais
     * /N6/ Município(6)   Listar unidades territoriais
     */
    this.$territorial_levels = [
      {
        label: `Brasil`,
        value: 1,
      },
      {
        label: `Brasil`,
        value: 10,
      },
      {
        label: `Municipio`,
        value: 6,
      },
    ];
  }

  getLastMonths(quantity = 12, asString = true) {
    const now = new Date();
    let months = [];

    for (let i = quantity; i > 0; i--) {
      const past = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(`${past.getFullYear()}${String(past.getMonth() + 1).padStart(2, "0")}`);
    }

    return asString ? months.join() : months;
  }

  mountURL({ variable, period, group }) {
    let url = `${this.endpoint}/values/t/${this.$table}/n1/all`;

    url = Array.isArray(variable)
      ? url.concat(`/v/${variable.join()}`)
      : url.concat(`/v/${variable}`);

    url = Array.isArray(period)
      ? url.concat(`/p/${period.join()}`)
      : url.concat(`/p/${period}`);

    url = Array.isArray(group)
      ? url.concat(`/c315/${group.join()}`)
      : url.concat(`/c315/${group}`);

    const decimalNumber = '2';
    const maximunDecimal = '02';
    if (Array.isArray(variable)) {
      const format = variable.map(v => `v${v}%${decimalNumber}${maximunDecimal}`);
      url = url.concat(`/d/${format.join()}`);
    } else {
      const format = `v${variable}%${decimalNumber}${maximunDecimal}`;
      url = url.concat(`/d/${format}`);
    }

    return url
  }

  // OLD URL
  // https://www.ibge.gov.br/explica/inflacao.php
  loadConjunturais() {
    // ipca: { abbrev: "IPCA", table: 1737, var: 2266,
    // ipca15: abbrev: "IPCA-15", table: 3065, var: 1117,
    const index = 3065;
    const variation = 1117;
    return this.cleanRequest(
      'GET',
      `https://servicodados.ibge.gov.br/api/v1/conjunturais?&d=s&user=ibge&t=${index}&v=${variation}&p=${this.getLastMonths()}&ng=1(1)&c=`
    );
  }

  async cleanRequest(method, url, headers = [], body = null) {
    return await new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      headers.map(h => xhr.setRequestHeader(h.key, h.value))
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(body);
    });
  }
}

export default new IPCA()
