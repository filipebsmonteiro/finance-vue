export const required = (val) => {
  return !!val || 'Campo obrigatório'
}

export const requiredIfEqual = (val, conditional, value) => {
  console.log(val)
  console.log(conditional)
  console.log(value)
  if (conditional === value) {
    return !!val || 'Campo obrigatório'
  }

  return 'Campo obrigatório'
}

export const validEmail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || 'Email inválido';
}

export const validCPF = (val) => {
  if (typeof val !== "string") return 'CPF não é string'
  let cpf = val.replace(/[\s.-]*/igm, '')
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    return 'CPF Sequencial'
  }
  var soma = 0
  var resto
  for (var i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if ((resto === 10) || (resto === 11)) resto = 0
  if (resto !== parseInt(cpf.substring(9, 10))) return 'CPF Inválido'
  soma = 0
  for (var i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if ((resto === 10) || (resto === 11)) resto = 0
  if (resto !== parseInt(cpf.substring(10, 11))) return 'CPF Inválido'
  return true
}

export const validBrazillianDate = (val) => {
  const dateReg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
  if (!val.match(dateReg)) { // Formato DD/MM/YYYY
    return val.match(dateReg) || 'Data Inválida! Padrão: Dia/Mês/Ano'
  }

  const parts = val.split('/')
  if (
      parseInt(parts[0]) < 1 || parseInt(parts[0]) > 31 || // Dia
      parseInt(parts[1]) < 1 || parseInt(parts[1]) > 12 ||// Mês
      parseInt(parts[2]) <= 1910 // Ano
  ) {
    return 'Data Inválida! Padrão: Dia/Mês/Ano'
  }

  return true
}

export const validPassword = (val) => {
  // Minimum eight characters, at least one letter and one number:
  // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

  // Minimum eight characters, at least one letter, one number and one special character:
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

  // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"

  return passwordPattern.test(val) || 'Senha inválida, verifique as regras';
}

export default {
  methods: {
    required,
    requiredIfEqual,
    validEmail,
    validCPF,
    validBrazillianDate,
    validPassword
  }
}
