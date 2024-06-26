import { COMPANY_ADDRESS_POSITION_END, COMPANY_ADDRESS_POSITION_START, COMPANY_NAME_POSITION_END, COMPANY_NAME_POSITION_START, SEGMENT_POSITION } from "./constants.js";

export const checkCompanyInRow = (row, companySearch) => {
    return row.toLowerCase().includes(companySearch)
}

export const extractCompanyDetails = (row, line) => {
    return {
        line,
        segment: row[SEGMENT_POSITION],
        name: getCompanyFullName(row),
        address: getCompanyAddress(row),
    }
}

export const getCompanyFullName = (row) => {
    return row.substring(COMPANY_NAME_POSITION_START, COMPANY_NAME_POSITION_END).trim()
}

export const getCompanyAddress = (row) => {
    return row.substring(COMPANY_ADDRESS_POSITION_START, COMPANY_ADDRESS_POSITION_END).trim()
}