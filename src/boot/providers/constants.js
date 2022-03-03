const LOCAL_STORAGE_PREFIX = process.env.NODE_ENV + `/veus/checkin/local/`
const SESSION_STORAGE_PREFIX = process.env.NODE_ENV + `/veus/checkin/session/`

export default {
  routes: {
    login: {
      name: 'auth.login'
    },
    carteirinha: {
      name: 'user.carteirinha'
    }
  },

  localStorage: {
    AUTH_TOKEN: `${LOCAL_STORAGE_PREFIX}auth_token`,
    AUTH_EXPIRATION: `${LOCAL_STORAGE_PREFIX}auth_expiration`,
    ADDRESS: `${LOCAL_STORAGE_PREFIX}address`
  }
}
