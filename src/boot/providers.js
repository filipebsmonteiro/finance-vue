import { scroll, date, Notify } from 'quasar'
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

  app.config.globalProperties.$getDateArrayByMonths = (from, to) => {
    if (!date.isValid(from) && !date.isValid(to)) {
      Notify.create({ type: 'negative', message: 'Informe data de início e fim válidas!' })
      return
    }

    let months = [];

    for (
      let d = from;
      date.getDateDiff(to, d, "months") > 0;
      d = date.addToDate(d, { months: 1 })
    ) {
      months.push(new Date(d));
    }

    return months;
  }

});
