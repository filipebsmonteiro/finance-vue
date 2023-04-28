export default {
  categories: (state) => {
    return state.list
      .map(s => s.category)
      .filter((stock, idx, array) => array.indexOf(stock) === idx);
  },
}
