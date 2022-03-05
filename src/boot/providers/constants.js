import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;

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

  localStorage: {
    AUTH_TOKEN: `${LOCAL_STORAGE_PREFIX}auth_token`,
    AUTH_EXPIRATION: `${LOCAL_STORAGE_PREFIX}auth_expiration`,

    FINANCE: {
      BALANCES: `${LOCAL_STORAGE_PREFIX}finance_balances`
    }
  }
}
