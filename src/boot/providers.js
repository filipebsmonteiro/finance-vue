import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll
import { boot } from "quasar/wrappers";
import constants from "./providers/constants";
import environment from "./providers/environment";
import formatters from "./providers/formatters";

export default boot(({ app }) => {

  app.config.globalProperties.$formaters = formatters

  app.config.globalProperties.$CONST = constants

  app.config.globalProperties.$ENV = environment

  app.config.globalProperties.$scrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    const target = getScrollTarget(element);
    const offset = element.offsetTop;
    const duration = 1000;
    setVerticalScrollPosition(target, offset, duration);
  }
  // app.provide('scrollTo', app.config.globalProperties.$scrollTo)

  app.config.globalProperties.$groupBy = (list, key) => {
    return list.reduce((acc, cur) => {
      (acc[cur[key]] = acc[cur[key]] || []).push(cur);
      return acc;
    }, {});
  }


});
