import { api } from "src/boot/axios";

export class Repository {
  constructor($axios = null) {
    this.endpoint = null;
    this.$axios = api;

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

export function createRepository(Instance) {
  return $axios => new Instance($axios)
}

export default new Repository()
