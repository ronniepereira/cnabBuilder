import { CNAB_FILENAME_DEFAULT } from "./constants.js";
import yargs from 'yargs'

export const optionsYargs = yargs(process.argv.slice(2))
  .usage('Uso: $0 [options]')
  .option("p", { alias: "filename", describe: "caminho (relativo) do arquivo CNAB", type: "string", default:CNAB_FILENAME_DEFAULT })
  .option("f", { alias: "from", describe: "posição inicial de pesquisa da linha do Cnab", type: "number", demandOption: true })
  .option("t", { alias: "to", describe: "posição final de pesquisa da linha do Cnab", type: "number", demandOption: true })
  .option("s", { alias: "segmento", describe: "tipo de segmento", type: "string"})
  .option("c", { alias: "empresa", describe: "nome da empresa", type: "string"})
  .option("e", { alias: "exportToJson", describe: "caminho do arquivo json para exportar", type: "string"})
  .option("w", { alias: "wholeFile", describe: "analisa todas linhas do arquivo", type: "boolean", default: false})
  .example('$0 -f 21 -t 34 -s p', 'lista a linha e campo que from e to do cnab')
  .argv;