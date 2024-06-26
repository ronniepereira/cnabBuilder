import chalk from 'chalk'

export const messageLog = (segmento, segmentoType, from, to, company) => `
----- Cnab linha ${segmentoType} -----

posição from: ${chalk.inverse.bgBlack(from)}

posição to: ${chalk.inverse.bgBlack(to)}

item isolado: ${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}

item dentro da linha ${segmentoType}: 
  ${segmento.substring(0, from)}${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}${segmento.substring(to)}
${company ? companyLog(company) : '\n'}
----- FIM ------
`

const companyLog = ({line, name, address, segment}) => {
  if(!name) return '\n'
  return `
nome da empresa: ${chalk.inverse.bgBlack(name)}

endereço da empresa: ${chalk.inverse.bgBlack(address)}

linha do arquivo: ${chalk.inverse.bgBlack(line)}

segmento: ${chalk.inverse.bgBlack(segment)}
`}