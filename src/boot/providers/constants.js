const LOCAL_STORAGE_PREFIX = process.env.NODE_ENV + `/local/`
const SESSION_STORAGE_PREFIX = process.env.NODE_ENV + `/session/`

export default {
  routes: {
    login: {
      name: 'auth.login'
    },
  },

  localStorage: {
    AUTH_TOKEN: `${LOCAL_STORAGE_PREFIX}auth_token`,
    AUTH_EXPIRATION: `${LOCAL_STORAGE_PREFIX}auth_expiration`
  }
}
