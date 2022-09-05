export function loadIpcaHistory({ commit }, months) {
  IBGERepository.loadConjunturais(months)
    .then(response => commit('', response))
}
