'use strict';
import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { log } from 'console';
import { CNAB_FILENAME_DEFAULT, HEADER_ROWS_DEFAULT, N_A, SEGMENT_POSITION, TAIL_ROWS_DEFAULT } from './utils/constants.js'
import { checkCompanyInRow, extractCompanyDetails } from './utils/functions.js'
import { messageCompanyLog, messageLog } from './utils/logger.js';
import { optionsYargs } from './utils/options.js';


import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function main() {
  const { filename, from, to, segmento, empresa, exportToJson, wholeFile } = optionsYargs
  const exportResults = []

  const filenameIsDefault = filename === CNAB_FILENAME_DEFAULT
  if (filenameIsDefault) {
    log(chalk.yellow(`Utilizando arquivo CNAB padrão 'cnabExample.rem', execute 'node cnabRows.js --help' para mais informações`));
  }

  const cnabFile = path.join(__dirname, filename)
  console.time('leitura Async')
  await readFile(cnabFile, 'utf8')
    .then(file => {
      const cnabArray = file.split('\n')
      if (!empresa && !segmento) {
        chalk.red(`Seguintes parametros não encontrados: --empresa   --segmento`)
        return
      }
      const segmentUpper = segmento ? segmento.toUpperCase() : null
      for (let index = HEADER_ROWS_DEFAULT; index < cnabArray.length - TAIL_ROWS_DEFAULT; index++) {
        const row = cnabArray[index]
        const currLine = index + 1
        if (!!empresa && row[SEGMENT_POSITION] === 'Q') {
          const companyExistsInRow = checkCompanyInRow(row, empresa)
          if (!companyExistsInRow) continue

          const companyDetails = extractCompanyDetails(row, empresa)
          log(messageCompanyLog(
            currLine,
            empresa,
            companyDetails.name,
            companyDetails.address,
            companyDetails.segment
          ))
          if (!!exportToJson) exportResults.push({ line: currLine, ...companyDetails })
          if (!wholeFile) break
        } else if (segmentUpper && row[SEGMENT_POSITION] === segmentUpper) {
          log(messageLog(row, segmentUpper, from, to))
          if(segmentUpper !== 'Q') return

          const companyDetails = extractCompanyDetails(row)
          log(messageCompanyLog(
            companyDetails.rowIndex,
            N_A,
            companyDetails.name,
            companyDetails.address,
            companyDetails.segment
          ))
          if (!!exportToJson) exportResults.push({ line: currLine, ...companyDetails })
          if (!wholeFile) break
        }
      }
    })
    .catch(error => {
      console.log("[READ-FILE] Error on process file", error)
    })
  console.timeEnd('leitura Async')

  if (!!exportToJson) {
    const fileBody = JSON.stringify({
      createdAt: new Date().toISOString(),
      result: exportResults
    })

    await writeFile(exportToJson, fileBody, 'utf-8')
      .catch(error => {
        console.log("[WRITE-FILE] Error on write output file", error)
      })
  }

}

await main()