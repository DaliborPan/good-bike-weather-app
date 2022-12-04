// TODO: Remove once functions are implemented
/* eslint-disable @typescript-eslint/no-unused-vars */

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

// TODO - implement
const calculateIndex = (
  accidents: BrnoBikeAccidentsResponse,
  temperature: number,
  precipitation: number
): DangerIndex => {
  return 8
}

// TODO: implement
const determineTransportType = (index: DangerIndex): Transport => {
  return 'BIKE'
}

const filterAccidentsByDate = (
  accidentsResponse: BrnoBikeAccidentsResponse,
  month: Month,
  date: number,
  year: Year
) => {
  return accidentsResponse.filter(
    ({ attributes: { den, mesic, rok } }) => den === date && mesic === month && rok === year
  )
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

  const index = calculateIndex(brnoBikeAccidents, temperature, precipitation)
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
    date: moment({ year, month, date }).toISOString()
  }
}
