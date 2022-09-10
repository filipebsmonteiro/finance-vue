import { defineStore } from "pinia";
import actions from "./actions";
import state from "./state";
import getters from "./getters";

export const useProjectionStore = defineStore('projection', {
  state,
  getters,
  actions,
});
