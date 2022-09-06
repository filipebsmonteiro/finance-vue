import { defineStore } from "pinia";
import state from "./state";
import getters from "./getters";

export const useProjectionStore = defineStore('projection', {
  state,
  getters,
});
