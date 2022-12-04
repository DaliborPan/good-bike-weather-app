// TODO: Remove once functions are implemented
/* eslint-disable @typescript-eslint/no-unused-vars */

import moment from 'moment'
import { BrnoBikeAccidentsResponse, DangerIndex, HistoryPageData, MetricValue, Month, Transport, Year } from '../types'
import { getBrnoBikeAccidents } from './accidents'
import { getTemperatureAllTime, getPrecipitationAllTime } from './weather'

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

function flatten<T>(arr: T[][]): T[] {
  return ([] as T[]).concat(...arr)
}

const compareHistoryPageData = (a: HistoryPageData, b: HistoryPageData) => {
  if (a.year < b.year) return -1
  if (a.year > b.year) return 1
  if (a.month < b.month) return -1
  if (a.month > b.month) return 1
  if (a.day < b.day) return -1
  return 1
}

export const getHistoryPageData = async () => {
  const [brnoBikeAccidents, temperatureResponse, precipitationResponse] = await Promise.all([
    getBrnoBikeAccidents(),
    getTemperatureAllTime(),
    getPrecipitationAllTime(),
  ])

  const data = temperatureResponse.map(({ year, month, ...tempData }) => {
    const monthPrecipitationData = precipitationResponse.find(
      (precipData) => precipData.year === year && precipData.month === month
    )

    return Object.keys(tempData)
      .filter((key) => !['month', 'year'].includes(key))
      .map((key) => +key)
      .map((day) => {
        const precipitation = monthPrecipitationData?.[day] ?? ''
        const temperature = tempData[day] ?? ''
        const accidents = filterAccidentsByDate(brnoBikeAccidents, month, day, year)

        const index = calculateIndex(accidents, temperature, precipitation)
        const transport = determineTransportType(index)

        return {
          year,
          month,
          temperature,
          precipitation,
          transport,
          accidents,
          day: day,
          index,
          date: moment({ year, month, day }).utc(true).toString(),
        } as HistoryPageData
      })
      .sort(compareHistoryPageData)
  })

  return flatten(data)
}
