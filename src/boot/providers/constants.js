const LOCAL_STORAGE_PREFIX = process.env.NODE_ENV + `/local/`
const SESSION_STORAGE_PREFIX = process.env.NODE_ENV + `/session/`

export default {
  routes: {
    login: {
      name: 'auth.login'
    },
  },

  FINANCE: {
    BALANCE: {
      INCOME: 'income',
      COST: 'cost'
    }
  },

  storage: {
    session: {
      AUTH_TOKEN: `${SESSION_STORAGE_PREFIX}auth_token`,
      AUTH_EXPIRATION: `${SESSION_STORAGE_PREFIX}auth_expiration`,
      USER: `${SESSION_STORAGE_PREFIX}user`,
    },

    local: {
      FINANCE: {
        BALANCES: `${LOCAL_STORAGE_PREFIX}finance_balances`,
        PATRIMONY: `${LOCAL_STORAGE_PREFIX}finance_patrimony`,
      }
    }
  },

}
