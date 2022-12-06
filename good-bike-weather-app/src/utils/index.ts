import { sum } from 'lodash'
import moment from 'moment'
import {
  BrnoBikeAccidentsResponse,
  DangerIndex,
  DateObject,
  Month,
  Transport,
  WeatherPrecipitationResponse,
  WeatherTemperatureResponse,
  Year,
} from '../types'

const PRECIPITATION_RISK_INDEX_WEIGHT = 3;
const TEMPERATURE_RISK_INDEX_WEIGHT = 1
const ACCIDENTS_RISK_INDEX_WEIGHT = 2;

const calculateIndex = (
  accidents: BrnoBikeAccidentsResponse,
  temperature: number,
  precipitation: number
): DangerIndex => {
  const precIndex = calculatePrecipitationIndex(precipitation);
  const tempIndex = calculateTemperatureIndex(temperature);
  const accIndex = accidentsIndex(accidents.length);

  return riskIndexAvg([
    ...Array(TEMPERATURE_RISK_INDEX_WEIGHT).fill(tempIndex),
    ...Array(PRECIPITATION_RISK_INDEX_WEIGHT).fill(precIndex),
    ...Array(ACCIDENTS_RISK_INDEX_WEIGHT).fill(accIndex),
  ]) as unknown as DangerIndex
}

const calculatePrecipitationIndex = (prec: number) => {
  if (prec <= 0) return 1;
  if (0 < prec && prec <= 1) return 4;
  if (1 < prec && prec <= 6) return 2 / 5 * prec + 18 / 5;
  if (6 < prec && prec <= 10) return 3 / 4 * prec + 6 / 4;
  return 9;
}

const calculateTemperatureIndex = (temp: number) => {
  if (-16 < temp && temp <= -2) return -3 / 14 * temp + 90 / 14;
  if (-2 < temp && temp <= 0) return -3 / 2 * temp + 3;
  if (0 < temp && temp <= 4) return -1 / 4 * temp + 3;
  if (4 < temp && temp <= 12) return -1 / 8 * temp + 5 / 2
  if (12 < temp && temp <= 20) return 1
  if (20 < temp && temp <= 32) return 1 / 6 * temp - 14 / 6;
  if (32 < temp) return 1 / 9 * temp + 5 / 9;
  return 9;
}

const accidentsIndex = (accidents: number) => {
  if (accidents <= 0) return 1;
  if (0 < accidents && accidents <= 1) return 2;
  if (1 < accidents && accidents <= 2) return 4;
  if (2 < accidents && accidents <= 3) return 6;
  if (3 < accidents && accidents <= 4) return 8;
  return 9;
}

const riskIndexAvg = (input: number[]) => {
  return Math.round(sum(input) / input.length);
}

// TODO: implement
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const determineTransportType = (index: DangerIndex): Transport => {
  return 'BIKE'
}

const filterAccidentsByDate = (
  accidentsResponse: BrnoBikeAccidentsResponse,
  month: Month,
  date: number,
  year: Year
) => {
  return accidentsResponse.filter(({ attributes: { datum, mesic, rok } }) => {
    const accidentDate = new Date(0)

    // field `datum` is represented as miliseconds from epocha
    accidentDate.setMilliseconds(datum)
    return accidentDate.getDate() === date && mesic === month && rok === year
  })
}

export const isNotNull = <T>(obj: T | null): obj is T => {
  return obj !== null
}

export const getDayData = (
  { date, month, year }: DateObject,
  brnoBikeAccidents: BrnoBikeAccidentsResponse,
  temperatureResponse: Omit<WeatherTemperatureResponse[0], 'month' | 'year'>,
  precipitationResponse?: Omit<WeatherPrecipitationResponse[0], 'month' | 'year'>
) => {
  const temperature = temperatureResponse[date]
  if (!temperature) return null

  // At this point we know, that
  // `temperature` and `precipitation` are defined and are numbers
  const precipitation = precipitationResponse![date] as number
  const accidents = filterAccidentsByDate(brnoBikeAccidents, month, date, year)

  const index = calculateIndex(accidents, temperature, precipitation)
  const transport = determineTransportType(index)

  return {
    day: date,
    month,
    year,
    index,
    accidents,
    precipitation,
    temperature,
    transport,
    date: moment({ year, month, date }).toISOString(),
  }
}
