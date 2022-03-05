/*********************
 * CONTROL VARIABLES *
 *********************/

let indexes = {
  ipca: {
    abbrev: "IPCA",
    table: 1737,
    var: 2266,
    minYear: 1979,
    minMonth: 12,
    maxYear: new Date().getFullYear(),
    maxMonth: new Date().getMonth() + 1
  },
  inpc: {
    abbrev: "INPC",
    table: 1736,
    var: 2289,
    minYear: 1979,
    minMonth: 3,
    maxYear: new Date().getFullYear(),
    maxMonth: new Date().getMonth() + 1
  },
  ipca15: {
    abbrev: "IPCA-15",
    table: 3065,
    var: 1117,
    minYear: 2000,
    minMonth: 05,
    maxYear: new Date().getFullYear(),
    maxMonth: new Date().getMonth() + 1
  }
}

let $els = {}

let validations = {
  minYear: 1979,
  minMonth: 03,
  brlYear: 1994,
  brlMonth: 07,
  maxYear: new Date().getFullYear(),
  maxMonth: new Date().getMonth() + 1
}

let currencies = [
  {
    name: "Cruzeiro",
    convert: 1, // not usable
    start: 19700501,
    end: 19840814,
    symbol: "Cr$",
    useCents: true
  }, {
    name: "Cruzeiro",
    convert: 1,
    start: 19840815,
    end: 19860227,
    symbol: "Cr$",
    useCents: false
  }, {
    name: "Cruzado",
    convert: 1 / 1000,
    start: 19860228,
    end: 19890115,
    symbol: "Cz$",
    useCents: true
  }, {
    name: "Cruzado Novo",
    convert: 1 / 1000,
    start: 19890116,
    end: 19900315,
    symbol: "NCz$",
    useCents: true
  }, {
    name: "Cruzeiro",
    convert: 1,
    start: 19900316,
    end: 19930731,
    symbol: "Cr$",
    useCents: true
  }, {
    name: "Cruzeiro Real",
    convert: 1 / 1000,
    start: 19930801,
    end: 19940630,
    symbol: "CR$",
    useCents: true
  }, {
    name: "Real",
    convert: 1 / 2750,
    start: 19940701,
    end: 99991231,
    symbol: "R$",
    useCents: true
  }
]

/*********************
* CONTROL FUNCTIONS *
*********************/

let initElements = function () {
  $els = {
    indexSelect: $('#indexSelect'),
    methodology: $('#methodology'),
    methodologyBtn: $('#methodologyBtn'),
    dateStart: $('#dateStart'),
    dateStartField: $('#dateStartField'),
    dateEnd: $('#dateEnd'),
    dateEndField: $('#dateEndField'),
    value: $('#value'),
    valueField: $('#valueField'),
    valueCurrency: $('#valueCurrency'),
    genButton: $('#generate'),
    result: $('#result'),
    resultField: $('#resultField'),
    resultCurrency: $('#resultCurrency'),
    resultPercent: $('#resultPercent')
  }

  $els.dateStart.mask('00/0000')
  $els.dateEnd.mask('00/0000')
  $els.value.mask("#.##0,00", { reverse: true })
}

let getPeriodStart = function ($date) {
  return Number(formatDateToPeriod($date.val()) + "01")
}

let getPeriodEnd = function ($date) {
  let endParts = extractYearAndMonthFromDate($date.val())
  let lastDayOfEnd = new Date(endParts[0], endParts[1], 0).getDate()
  return Number(formatDateToPeriod($date.val()) + (lastDayOfEnd < 10 ? '0' : '') + lastDayOfEnd)
}

let updateValueCurrency = function () {
  let currencyStart = currencies.find(e => e.end >= getPeriodStart($els.dateStart))

  $els.valueCurrency.text(currencyStart.symbol)
  $els.valueCurrency.attr('title', currencyStart.name)

  if (currencyStart.useCents) {
    $els.value.mask("#.##0,00", { reverse: true })
    $els.value.attr('placeholder', "999,99")
  } else {
    $els.value.mask("#.##0", { reverse: true })
    $els.value.attr('placeholder', "999")
  }
}

let updateResultCurrency = function () {
  let currencyEnd = currencies.find(e => e.end >= getPeriodEnd($els.dateEnd))

  $els.resultCurrency.text(currencyEnd.symbol)
  $els.resultCurrency.attr('title', currencyEnd.name)
}

let inputSubmitOnEnter = function (ev) {
  if ((ev.keyCode ? ev.keyCode : ev.which) == 13) {
    this.blur()
  }
}

let calcVariation = function (dataJSON) {
  let periodStart = formatDateToPeriod($els.dateStart.val())
  let periodEnd = formatDateToPeriod($els.dateEnd.val())

  let referenceIndex = dataJSON.findIndex(e => e.p_cod == periodStart)
  let startIndex = dataJSON[referenceIndex - 1]
  let endIndex = dataJSON.find(e => e.p_cod == periodEnd)
  return endIndex.v / startIndex.v // 6153,09 / 6075,69 = 1,01273106429064
}

/**
* Transform an currency value from start to end, changing its currency
* @param {} reference
* @param {} end
* @param {} value
*/
let calcTransformation = function (reference, end, value) {
  let finalValue = value
  let referenceCurrencyIndex = currencies.findIndex(c => c.end >= reference)
  let endCurrencyIndex = currencies.findIndex(c => c.end >= end)

  if (referenceCurrencyIndex < endCurrencyIndex) {
    for (let c = referenceCurrencyIndex + 1; c <= endCurrencyIndex; c++) {
      finalValue *= currencies[c].convert
    }
  } else if (referenceCurrencyIndex > endCurrencyIndex) {
    for (let c = referenceCurrencyIndex; c > endCurrencyIndex; c--) {
      finalValue /= currencies[c].convert
    }
  }

  return finalValue
}

let validate = function () {
  let isInAValidPeriod = function (date) {
    let parts = extractYearAndMonthFromDate(date)
    return parts[1] >= 1 && parts[1] <= 12
      && formatDateToPeriod(date) >= formatPeriod(validations.minYear, validations.minMonth)
      && formatDateToPeriod(date) <= formatPeriod(validations.maxYear, validations.maxMonth)
  }

  let isStartValid = isInAValidPeriod($els.dateStart.val())
  if (isStartValid) {
    $els.dateStartField.removeClass("invalid")
    $els.dateStartField.find(".validation-message").text("")
  } else {
    $els.dateStartField.addClass("invalid")
    $els.dateStartField.find(".validation-message").text(`Escolha uma data entre ${validations.minMonth}/${validations.minYear} e ${validations.maxMonth}/${validations.maxYear}`)
  }

  let isEndValid = isInAValidPeriod($els.dateEnd.val())
  if (isEndValid) {
    $els.dateEndField.removeClass("invalid")
    $els.dateEndField.find(".validation-message").text("")
  } else {
    $els.dateEndField.addClass("invalid")
    $els.dateEndField.find(".validation-message").text(`Escolha uma data entre ${validations.minMonth}/${validations.minYear} e ${validations.maxMonth}/${validations.maxYear}`)
  }

  return isStartValid && isEndValid
}

let displayResults = function (variation) {//1,01273106429064
  let numberValue = getNumberValue($els.value.val()) // 100
  let result = parseFloat(numberValue * variation) // 100,01273106429064
  result = calcTransformation(getPeriodStart($els.dateStart), getPeriodEnd($els.dateEnd), result)

  let currencyEnd = currencies.find(e => e.end >= getPeriodEnd($els.dateEnd))
  let text = ""
  $els.result.text("")
  if (currencyEnd.useCents) {
    let precision = 2
    if (result < 1) {
      text = (result.toFixed(precision) + '')
        .replace(".", ",")
        .substr(0, 2 + precision)
    } else {
      $els.result.mask("#.##0,00", { reverse: true })
      text = $els.result.masked((result * Math.pow(10, precision)).toFixed(0))
      $els.result.unmask()
    }
  } else {
    $els.result.mask("#.##0", { reverse: true })
    text = $els.result.masked(result.toFixed(0))
    $els.result.unmask()
  }
  $els.result.text(text)

  if (getPeriodStart($els.dateStart) < getPeriodEnd($els.dateEnd)) {
    variation = parseFloat(100 * variation - 100) // 1,27
  } else {
    variation = parseFloat(100 / variation - 100)
  }

  text = ''
  let precision = 2 // remember to change mask below too
  if (variation < 1) {
    text = (variation.toFixed(precision) + '')
      .replace(".", ",")
      .substr(0, 2 + precision)
  } else {
    $els.resultPercent.text("")
    $els.resultPercent.mask("#.##0,00", { reverse: true })
    text = $els.resultPercent.masked((variation * Math.pow(10, precision)).toFixed(0))
    $els.resultPercent.unmask()
  }
  $els.resultPercent.text(text)

  $els.resultField.removeClass("empty")
}

let hideResults = function () {
  $els.resultField.addClass("empty")
}

let getPeriods = function (minYear, minMonth, maxYear, maxMonth) {
  let ano = minYear,
    mes = minMonth - 1, // Bacen: need previous month to calculate first month
    p = []

  if (mes <= 0) {
    mes = 12
    ano--
  }

  for (; ano <= maxYear; ano++) {
    for (; mes <= 12 && ano != maxYear || mes <= maxMonth; mes++) {
      p.push(formatPeriod(ano, mes))
    }
    mes = 1
  }

  return p
}

let getNumberValue = function (v) {
  let r = v.replace(/\./g, "").replace(",", ".")
  return Number(r)
}

let formatPeriod = function (year, month) {
  return year + (month < 10 ? '0' : '') + month
}

let getMostRecentPeriodOrFirst = function (p1, p2) {
  return p1 > p2 ? p1 : p2
}

let formatDate = function (year, month) {
  return (month < 10 ? '0' : '') + month + '/' + year
}

let formatDateToPeriod = function (date) {
  let parts = date.split('/')
  return '' + parts[1] + parts[0]
}

let extractYearAndMonthFromPeriod = function (period) {
  return [period.substr(0, 4), period.substr(4)]
}

let extractYearAndMonthFromDate = function (date) {
  return [date.substr(3), date.substr(0, 2)]
}

/*********************
* MAIN              *
*********************/

let refreshPage = function (dataJSON) {
  let minPeriod = dataJSON[1].p_cod // Bacen: first element is one month behind
  let firstYearAndMonth = extractYearAndMonthFromPeriod(minPeriod)
  let lastYearAndMonth = extractYearAndMonthFromPeriod(dataJSON[dataJSON.length - 1].p_cod)
  validations.minYear = Number(firstYearAndMonth[0])
  validations.minMonth = Number(firstYearAndMonth[1])
  validations.maxYear = Number(lastYearAndMonth[0])
  validations.maxMonth = Number(lastYearAndMonth[1])

  $els.methodologyBtn.off('click.calculadora')
  $els.methodologyBtn.on('click.calculadora', function () {
    $els.methodology.toggleClass('on')
  })

  $els.genButton.off('click.calculadora')
  $els.genButton.on('click.calculadora', function () {
    if (validate()) {
      displayResults(calcVariation(dataJSON))
    } else {
      hideResults()
    }
  })
}

$(function () {
  initElements()

  $els.dateStart.keypress(inputSubmitOnEnter)
  $els.dateEnd.keypress(inputSubmitOnEnter)
  $els.value.keypress(inputSubmitOnEnter)

  $els.dateStart.change(hideResults)
  $els.dateStart.change(updateValueCurrency)
  $els.dateEnd.change(hideResults)
  $els.dateEnd.change(updateResultCurrency)
  $els.value.change(hideResults)

  $els.indexSelect.change(function () {
    let selectedIndex = indexes[this.value]
    let selectedPeriods = getPeriods(
      selectedIndex.minYear,
      selectedIndex.minMonth,
      selectedIndex.maxYear,
      selectedIndex.maxMonth
    ).join()

    $.ajax(`//servicodados.ibge.gov.br/api/v1/conjunturais?&d=s&user=ibge&t=${selectedIndex.table}&v=${selectedIndex.var}&p=${selectedPeriods}&ng=1(1)&c=`, {
      success: refreshPage,
      error: console.error
    })
  })

  //const urlParams = new URLSearchParams(window.location.search)
  const urlParams = new URL(window.location)
  const indexParam = (urlParams.searchParams) ? urlParams.searchParams.get('index') : null
  if (indexes[indexParam]) {
    $els.indexSelect.val(indexParam)
  } else {
    $els.indexSelect.val('ipca')
  }
  $els.indexSelect.change()
})
