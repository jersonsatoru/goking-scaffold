export const calculaIdade = (dataNasc) => {
  let dataAtual = new Date()
  let anoAtual = dataAtual.getFullYear()
  let anoNascParts = dataNasc.split('-')
  let diaNasc = anoNascParts[2]
  let mesNasc = anoNascParts[1]
  let anoNasc = anoNascParts[0]
  let idade = anoAtual - anoNasc
  let mesAtual = dataAtual.getMonth() + 1

  //Se mes atual for menor que o nascimento, nao fez aniversario ainda;
  if (mesAtual < mesNasc) {
    idade--
  } else {
    //Se estiver no mes do nascimento, verificar o dia
    if (mesAtual == mesNasc) {
      if (new Date().getDate() < diaNasc) {
        //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
        idade--
      }
    }
  }
  return idade
}
