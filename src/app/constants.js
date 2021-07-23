export const API_URL = "https://freecurrencyapi.net/api/v1/"


export const getAlltoOne = (currency) => `/rates?base_currency=${currency}&`
export const getBetweenDates = (currency, start = '2021-6-19', end = '2021-7-19') => `/rates?date_from=${start}&date_to=${end}&`