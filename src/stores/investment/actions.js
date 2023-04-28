import TargetCategory from "src/repositories/Investment/Firebase/Target/Category";
import Investment from "src/repositories/Investment/Investment"

export async function autocomplete(term) {
  this.loading = true
  await Investment.autocomplete(term)
    .then(response => this.autocompleteOptions = response.stocks);
  this.loading = false
}

export async function loadUserCategoryTargets() {
  this.loading = true
  await TargetCategory.fetch()
    .then(response => this.userCategoryTargets = response);
  this.loading = false
}

export function $resetAutoComplete() {
  this.autocompleteOptions = [
    "PETR4",
    "VALE3",
    "BBDC4",
    "ITUB4",
    "IVVB11"
  ];
}