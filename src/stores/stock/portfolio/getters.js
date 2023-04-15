import { groupBy } from "src/boot/providers"

export default {
  groupedByStock: (state) => {
    return groupBy(state.list, `code`)
  },
}
