import { date } from "quasar";

export default {
  abbreviate: function (name) {
    const names = name.split(' ');
    const firstName = names.shift();
    const lastName = names.length ? names.pop() : '';

    return firstName + ' ' + names.map(name => name.substr(0, 1).toUpperCase() + '. ').join('') + lastName;
  },

  firstName: function (name) {
    const names = name.split(' ');
    return names.shift();
  },

  cpf: function (cpf) {
    const rawCpf = cpf.replace(/[^\d]/g, "");
    return rawCpf.length !== 11 ?
      rawCpf : rawCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },

  date: function (value, printHour = true) {
    if (value) {
      let outputFormat = printHour ? 'DD/MM/YYYY H:mm:ss' : 'DD/MM/YYYY'
      let dateObject = new Date(value)

      if (typeof value === 'object' && value.date) {
        //dateObject = date.extractDate(value.date, inputFormat)
        dateObject = new Date(value.date)
      }

      return date.formatDate(dateObject, outputFormat)
    }
  },

  invertYearMonth: (yearMonth) => {
    yearMonth = String(yearMonth);
    const monthNumber = yearMonth.slice(-2);
    const yearNumber = yearMonth.slice(0, 4);
    const date = new Date();

    date.setMonth(monthNumber - 1);

    return `${date.toLocaleString('pt-BR', { month: 'short' })} de ${yearNumber}`;
    // return `${date.toLocaleString('pt-BR', { month: 'short' })} de ${yearNumber}`;
  },

  money: function (value) {
    if (!value) return 0

    if (typeof value === 'string') {
      value = parseFloat(value)
    }

    return value.toLocaleString('pt-br', {
      currency: 'BRL',
      style: 'currency'
    })

    // const formatter = new Intl.NumberFormat('pt-br', {
    //   currency: 'BRL',
    //   style: 'currency'
    // })
    // return formatter.format(value)

    // return `R$ ${value.toFixed(2)}`.replace('.', ',');
  },

  bytesToSize: function (bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  },

  idNameToValueLabel: function (value) {
    if (value && Array.isArray(value)) {
      return value.map(ent => {
        return {
          label: ent.name,
          value: ent.id
        }
      })
    }
    return []
  },

  idNameToValueText: function (value) {
    if (value && Array.isArray(value)) {
      return value.map(ent => {
        return {
          text: ent.name,
          value: ent.id
        }
      })
    }
    return []
  },

  nl2br: function (str) {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1$2');
  }

}
