import { defineStore } from 'pinia';

import state from './state'
import getters from './getters'
import * as actions from './actions'

export const useNationalQuotationStore = defineStore('nationalQuotation', {
  state,
  getters,
  actions: {
    ...actions
  }
});
