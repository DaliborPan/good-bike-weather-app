import { getDayData, isNotNull } from '../utils'
import { getBrnoBikeAccidents } from './accidents'
import { getTemperatureAllTime, getPrecipitationAllTime } from './weather'

const flatten = <T>(arr: T[][]): T[] => {
  return ([] as T[]).concat(...arr)
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
      .filter(isNotNull)
  })

  return flatten(data)
}
