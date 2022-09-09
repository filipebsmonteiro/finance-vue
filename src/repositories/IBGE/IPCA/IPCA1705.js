
import { IPCA } from "src/repositories/IBGE/IPCA/IPCA";

/**
 * Link:
 * https://apisidra.ibge.gov.br/desctabapi.aspx?c=1705
 */
class IPCA1705 extends IPCA {
  $table = 1705;
  $description = `IPCA15 - Variação mensal, acumulada no ano, acumulada em 12 meses e peso mensal, para o índice geral, grupos, subgrupos, itens e subitens de produtos e serviços (de fevereiro/2012 até janeiro/2020)`;

  /**
   * /P/ Mês(96)
   */
  $months = [
    201202, 201203, 201204, 201205, 201206, 201207, 201208, 201209,
    201210, 201211, 201212, 201301, 201302, 201303, 201304, 201305,
    201306, 201307, 201308, 201309, 201310, 201311, 201312, 201401,
    201402, 201403, 201404, 201405, 201406, 201407, 201408, 201409,
    201410, 201411, 201412, 201501, 201502, 201503, 201504, 201505,
    201506, 201507, 201508, 201509, 201510, 201511, 201512, 201601,
    201602, 201603, 201604, 201605, 201606, 201607, 201608, 201609,
    201610, 201611, 201612, 201701, 201702, 201703, 201704, 201705,
    201706, 201707, 201708, 201709, 201710, 201711, 201712, 201801,
    201802, 201803, 201804, 201805, 201806, 201807, 201808, 201809,
    201810, 201811, 201812, 201901, 201902, 201903, 201904, 201905,
    201906, 201907, 201908, 201909, 201910, 201911, 201912, 202001
  ];

  /**
   * /V/  Variável(4)
   */
  $variables = [
    {
      label: `IPCA15 - Variação mensal (%) - casas decimais: padrão = 2, máximo = 2`,
      value: 355,
    },
    {
      label: `IPCA15 - Variação acumulada no ano (%) - casas decimais: padrão = 2, máximo = 2`,
      value: 356,
    },
    {
      label: `IPCA15 - Variação acumulada em 12 meses (%) [março 2017 a janeiro 2020] - casas decimais: padrão = 2, máximo = 2`,
      value: 1120,
    },
    {
      label: `IPCA15 - Peso mensal (%) - casas decimais: padrão = 4, máximo = 4`,
      value: 357,
    },
  ];

  /**
   *
   * @param {variable} 355
   * @param {period} all
   * @param {group} 7169
   * @returns
   */
  load({ variable = [`355`], period = [`all`], group = [`7169`] }) {
    const url = super.mountURL({ variable, period, group });

    return this.cleanRequest('GET', `${url}?formato=json`);
  }
}

export default new IPCA1705()
