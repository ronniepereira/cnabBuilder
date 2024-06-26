import chalk from 'chalk'

export const messageCompanyLog = (rowIdx, search, companyName, companyAddress, segment) => `
----- Empresa encontrada:  ${companyName} -----

Nome da empresa: ${chalk.inverse.bgBlack(companyName)}

Endereço da empresa: ${chalk.inverse.bgBlack(companyAddress)}

Linha do arquivo: ${chalk.inverse.bgBlack(rowIdx)}

Item Pesquisado: ${chalk.inverse.bgBlack(search)}

Segmento: ${chalk.inverse.bgBlack(segment)}
----- FIM ------
`

export const messageLog = (segmento, segmentoType, from, to) => `
----- Cnab linha ${segmentoType} -----

posição from: ${chalk.inverse.bgBlack(from)}

posição to: ${chalk.inverse.bgBlack(to)}

item isolado: ${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}

item dentro da linha ${segmentoType}: 
  ${segmento.substring(0, from)}${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}${segmento.substring(to)}

----- FIM ------
`