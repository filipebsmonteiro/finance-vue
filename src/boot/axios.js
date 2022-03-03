import { boot } from "quasar/wrappers";
import { Notify } from 'quasar'
import { Store } from 'src/store'
import environment from "./providers/environment";
import axios from 'axios'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

// Error Treatment
const onReject = (error) => {
  //const originalRequest = error.config

  if (typeof error.response === 'undefined') {
    Notify.create({ type: 'negative', message: `Verifique sua conexão! Ocorreu um erro de rede, possível falha CORS.` })
  }

  // 400 Bad Request
  if (error.response && error.response.status === 400 && error.response.data.message) {
    Notify.create({ type: 'negative', message: error.response.data.message })
    return Promise.reject(error)
  }

  // 401 Unauthorized
  if (error.response && error.response.status === 401) {
    Notify.create({ type: 'negative', message: 'Usuário não possui permissão para realizar essa transação na API!' })
    return Promise.reject(error)
  }

  // 404
  if (error.response && error.response.status === 404) {
    Notify.create({ type: 'negative', message: 'Recurso não localizado na API!' })
    return Promise.reject(error)
  }

  // 422 Unprocessable Entity
  if (error.response && error.response.status === 422 && error.response.data.errors) {
    const errors = error.response.data.errors
    Object.keys(errors).map(field => {
      if (Array.isArray(errors[field])) {
        errors[field].map(msg => {
          Notify.create({ type: 'negative', message: msg })
        })
      } else {
        Notify.create({ type: 'negative', message: errors[field] })
      }
    })

  }

  // 500 Internal Server Error
  if (error.response && error.response.status === 500 && error.response.data.message) {
    // Notify.create({type: 'negative', message: 'Erro interno no servidor, confira o Console!'})
    Notify.create({ type: 'negative', message: error.response.data.message })
    return Promise.reject(error)
  }

  return Promise.reject(error)
}
// Attach Function Treatment
axios.interceptors.response.use((response) => response, onReject);

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// API
const api = axios.create({ baseURL: environment.api.URL });
api.interceptors.response.use((response) => response, onReject);
api.useBearerToken = () => {
  api.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${Store.getters['auth/token']}`
      return config
    },
    error => Promise.reject(error)
  );
  return api
}

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;

})

export {
  api
}

