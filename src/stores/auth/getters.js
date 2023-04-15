import { SessionStorage } from "quasar";
import constants from "src/boot/providers/constants";

export default {
  avatar: (state) => state?.user?.photoURL,

  isLogged() { return this.getUser !== null && this.getUser !== undefined },

  getUser: (state) => {
    if (!state.user && SessionStorage.getItem(constants.storage.session.USER))
      state.user = SessionStorage.getItem(constants.storage.session.USER)

    return state?.user
  },
}
