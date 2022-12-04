import { DayData } from '../types'
import { getDayData } from '../utils'
import { getBrnoBikeAccidents } from './accidents'
import { getTemperatureAllTime, getPrecipitationAllTime } from './weather'

const flatten = <T>(arr: T[][]): T[] => {
  return ([] as T[]).concat(...arr)
}

const compareHistoryPageData = (a: DayData, b: DayData) => {
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

  const data = temperatureResponse.map(({ year, month, ...temperatureMonthData }) => {
    const monthPrecipitationData = precipitationResponse.find(
      (precipData) => precipData.year === year && precipData.month === month
    )

    return Object.keys(temperatureMonthData)
      .map((key) =>
        getDayData({ date: +key, month, year }, brnoBikeAccidents, temperatureMonthData, monthPrecipitationData)
      )
      .sort(compareHistoryPageData)
  })

  return flatten(data)
}
