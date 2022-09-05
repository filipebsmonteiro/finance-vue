import { api } from "src/boot/axios";

export class Repository {
  //endpoint = null
  //$axios = api

  constructor($axios = null) {
    if ($axios) {
      this.$axios = $axios
    }
  }

  fetch(params) {
    return this.$axios.useBearerToken().get(`${this.endpoint}`, {
      params,
      paramsSerializer
    })
  }

  fetchOne(id, params = null) {
    if (params) {
      return this.$axios.useBearerToken().get(`${this.endpoint}/${id}`, {
        params,
        paramsSerializer
      })
    }

    return this.$axios.useBearerToken().get(`${this.endpoint}/${id}`)
  }

  post(params) {
    return this.$axios.useBearerToken().post(`${this.endpoint}`, params)
  }

  put(id, params) {
    return this.$axios.useBearerToken().put(`${this.endpoint}/${id}`, params)
  }

  delete(id) {
    return this.$axios.useBearerToken().delete(`${this.endpoint}/${id}`)
  }

}

export function createRepository(Instance) {
  return $axios => new Instance($axios)
}

export default new Repository()
