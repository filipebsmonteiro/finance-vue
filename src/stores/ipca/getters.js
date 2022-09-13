export default {
  getColumns: (state) => {
    let columns = [];
    for (const [key, value] of Object.entries(state.columns)) {
      if (
        key.slice(-1) === 'C' ||  // Hide Codes Columns
        key === 'D1N' || // Hide Territory Column
        key === 'NN' ||  // Hide Territory Column
        key === 'D4N'    // Hide Groups Column
      ) {
        continue;
      }

      columns.push({
        // name: key,
        field: key,
        label: value,
        // sortable: true,
        // align: "left",
      })
    }
    return columns;
  },
  getLastMonthsAverage: (state) => {
    return parseFloat(
      (state.list.reduce((acc, cur) => acc + parseFloat(cur.V), 0) / state.list.length).toFixed(2)
    )
  }
}
