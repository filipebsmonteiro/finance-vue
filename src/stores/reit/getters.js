export default {
  onlySymbols: (state) => {
    return state.list.map(etf => etf.code)
  },
}
