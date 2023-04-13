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

  async cleanRequest(method, url, headers = {}, body = null) {
    return await new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      // xhr.timeout = 1500; // time in milliseconds
      xhr.open(method, url);
      Object.entries(headers).map(([key, value]) => xhr.setRequestHeader(key, value))
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          try {
            resolve(JSON.parse(xhr.response));
          } catch (error) {
            resolve(xhr.response);
          }
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      // xhr.ontimeout = (e) => {
      //   xhr.onload();
      // };
      // xhr.onreadystatechange = function () {
      //   console.log('xhr.readyState :>> ', xhr.readyState);
      //   if (xhr.readyState == 4) {
      //     alert("ready state = 4");
      //   }
      // };
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
