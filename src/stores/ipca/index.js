import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';
import state from './state';

export const useIPCAStore = defineStore('ipca', {
  state,
  getters,
  actions,
});
