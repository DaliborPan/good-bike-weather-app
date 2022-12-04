// TODO: Remove once functions are implemented
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  BrnoBikeAccidentsResponse,
  DangerIndex,
  DateObject,
  MetricValue,
  Month,
  Transport,
  WeatherPrecipitationResponse,
  WeatherTemperatureResponse,
  Year,
} from '../types'

// TODO - implement
const calculateIndex = (
  accidents: BrnoBikeAccidentsResponse,
  temperature: MetricValue,
  precipitation: MetricValue
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

export const getDayData = (
  { date, month, year }: DateObject,
  brnoBikeAccidents: BrnoBikeAccidentsResponse,
  temperatureResponse: Omit<WeatherTemperatureResponse[0], 'month' | 'year'>,
  precipitationResponse?: Omit<WeatherPrecipitationResponse[0], 'month' | 'year'>
) => {
  const temperature = temperatureResponse[date] ?? ''
  const precipitation = precipitationResponse?.[date] ?? ''
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
  }
}
