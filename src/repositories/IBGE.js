
import { Repository } from "src/repositories/Base/Repository";
import { date } from "quasar";
import { axios } from "src/boot/axios";

class IBGERepository extends Repository {
  endpoint = null
  $axios = axios

  // sendRecoveryEmail(params) {
  //   return this.$axios.post(`auth/password/email`, params)
  // }

  loadConjunturais(months) {
    return this.$axios.get(`${examProfileUrl}/avatar/${user_id}?d${Date.now()}`)
  }
}

export default new IBGERepository()

// O IPCA-E tem periodicidade mensal, mas sua divulgação é trimestral, ocorrendo
// sempre ao fim de cada trimestre civil (março, junho, setembro e dezembro). O
// IPCA-E tem abrangência geográfica e população-objetivo iguais ao IPCA, mas
// período de coleta diferente (aproximadamente do dia 16 do mês anterior ao dia 15
// do mês de referência).

https://servicodados.ibge.gov.br/api/v1/conjunturais?&d=s&user=ibge&t=1737&v=2266&p=202103,202104,202105,202106,202107,202108,202109,202110,202111,202112,202201,202202,202203&ng=1(1)&c=


startIndex = dataJSON[inicioIndex - 1]
endIndex = asdfsdf //dataJSON.find(e => e.p_cod == periodEnd)
variation = endIndex.v / startIndex.v

if (getPeriodStart($els.dateStart) < getPeriodEnd($els.dateEnd)) {
  variation = parseFloat(100 * variation - 100) // 1,27
} else error


