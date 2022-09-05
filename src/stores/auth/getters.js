import { date, LocalStorage } from 'quasar'
//import { Store } from 'src/stores'
import CONSTANTS from "src/boot/providers/constants";

export function isLoading(state) {
  return state.loading
}

export function user(state) {
  // TODO: Decriptografar o JWT
  // return state.jwt_token
  return state.user
}

export function avatar(state) {
  return state.avatar
}

export function isLogged(state) {
  if (!state.expiration_date && LocalStorage.getItem(CONSTANTS.localStorage.AUTH_EXPIRATION)) {
    Store.commit('auth/setExpirationDate', LocalStorage.getItem(CONSTANTS.localStorage.AUTH_EXPIRATION))
  }

  if (state.expiration_date) {
    return date.getDateDiff(state.expiration_date, date.buildDate({}), 'seconds') > 0
  }

  return false
}

export function token(state) {
  if (!state.access_token && LocalStorage.getItem(CONSTANTS.localStorage.AUTH_TOKEN)) {
    Store.commit('auth/setAccessToken', LocalStorage.getItem(CONSTANTS.localStorage.AUTH_TOKEN))
  }

  return state.access_token
}

export function refresh(state) {
  return state.refresh_token
}

