import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

export default {
  namespaced: true,
  name: 'balance',
  getters,
  mutations,
  actions,
  state,
};
