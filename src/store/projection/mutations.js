export function setUntilFreedom(state, boolean) {
  state.untilFreedom = boolean
}

export function setMonthsQuantity(state, number) {
  state.months = parseFloat(number)
}

export function setInvestment(state, number) {
  state.investment = parseFloat(number)
}

export function setInflation(state, number) {
  state.inflation = parseFloat(number)
}
