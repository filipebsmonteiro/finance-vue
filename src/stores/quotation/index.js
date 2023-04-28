import { defineStore } from 'pinia';

import state from './state'
import getters from './getters'
import * as actions from './actions'

export const useQuotationStore = defineStore('quotation', {
  state,
  getters,
  actions: {
    ...actions
  }
});
