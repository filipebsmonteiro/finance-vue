
import { IPCA } from "src/repositories/IBGE/IPCA/IPCA";

/**
 * Link:
 * https://apisidra.ibge.gov.br/desctabapi.aspx?c=7060
 */
class IPCA7060 extends IPCA {
  $table = 7060;
  $description = `IPCA - Variação mensal, acumulada no ano, acumulada em 12 meses e peso mensal, para o índice geral, grupos, subgrupos, itens e subitens de produtos e serviços (a partir de janeiro/2020)`;

  /**
   * /P/ Mês(96)
   */
  $months = [
    202001, 202002, 202003, 202004, 202005, 202006, 202007, 202008,
    202009, 202010, 202011, 202012, 202101, 202102, 202103, 202104,
    202105, 202106, 202107, 202108, 202109, 202110, 202111, 202112,
    202201, 202202, 202203, 202204, 202205, 202206, 202207, 202208
  ];

  /**
   * /V/  Variável(4)
   */
  $variables = [
    {
      label: `IPCA - Variação mensal (%) - casas decimais: padrão = 2, máximo = 2`,
      value: 63,
    },
    {
      label: `IPCA - Variação acumulada no ano (%) - casas decimais: padrão = 2, máximo = 2`,
      value: 66,
    },
    {
      label: `IPCA - Variação acumulada em 12 meses (%) [dezembro 2020 a agosto 2022] - casas decimais: padrão = 2, máximo = 2`,
      value: 2265,
    },
    {
      label: `IPCA - Peso mensal (%) - casas decimais: padrão = 4, máximo = 4`,
      value: 66,
    },
  ];

  /**
   *
   * @param {variable} 63
   * @param {period} all
   * @param {group} 7169
   * @returns
   */
  load({ variable = [`63`], period = [`all`], group = [`7169`] }) {
    const url = super.mountURL({ variable, period, group });

    return this.cleanRequest('GET', `${url}?formato=json`);
  }
}

export default new IPCA7060()
