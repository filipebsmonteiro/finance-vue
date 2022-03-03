import { boot } from "quasar/wrappers";
import constants from "./providers/constants";
import environment from "./providers/environment";
import formatters from "./providers/formatters";

export default boot(({ app }) => {

  app.config.globalProperties.$formaters = formatters

  app.config.$CONST = constants

  app.config.$ENV = environment

});
