import { groupBy } from "src/boot/providers"

export default {
  isLoading: (state) => state.loading,
  groupedByStock: (state) => {
    return groupBy(state.list, `code`)
  },
}
