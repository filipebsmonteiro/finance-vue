import { date, LocalStorage } from 'quasar'
import CONSTANTS from "src/boot/providers/constants";

export function setLoading(state, boolean) {
  state.loading = boolean
}

export function setExpirationDate(state, localeString) {
  state.expiration_date = localeString
  LocalStorage.set(CONSTANTS.localStorage.AUTH_EXPIRATION, localeString)
}

export function setExpirationSeconds(state, seconds) {
  const now = date.buildDate({});
  state.expiration_date = date.addToDate(now, { seconds })
  LocalStorage.set(CONSTANTS.localStorage.AUTH_EXPIRATION, date.addToDate(now, { seconds }))
}

export function setAccessToken(state, token) {
  state.access_token = token
  LocalStorage.set(CONSTANTS.localStorage.AUTH_TOKEN, token)
}

export function setRefreshToken(state, token) {
  state.refresh_token = token
}

export function setJwtToken(state, token) {
  state.jwt_token = token
}

export function setUser(state, obj) {
  state.user = obj
}

export function setAvatar(state, string) {
  state.avatar = string
}
