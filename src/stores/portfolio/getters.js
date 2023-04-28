import { groupBy } from "src/boot/providers"

export default {
  groupedBySymbol: (state) => {
    return groupBy(state.list, `code`)
  },
}
