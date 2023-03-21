import { SessionStorage } from 'quasar'
import constants from 'src/boot/providers/constants';

export function setLoading(state, boolean) {
  state.loading = boolean
}

export function setAccessToken(state, token) {
  state.token = token
  SessionStorage.set(constants.storage.session.AUTH_TOKEN, token)
}

export function setUser(state, obj) {
  state.user = obj
  SessionStorage.set(constants.storage.session.USER, obj)
}
