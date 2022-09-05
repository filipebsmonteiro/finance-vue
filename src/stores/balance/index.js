import { defineStore } from "pinia";
import state from "./state";
import actions from "./actions";
import getters from "./getters";

export const useBalanceStore = defineStore('balance', {
  state,
  getters,
  actions,
})
