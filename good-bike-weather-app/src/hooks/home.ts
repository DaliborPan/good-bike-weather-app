import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  OFFSET_YEAR,
  WEATHER_PRECIPITATION_API_BASE,
  WEATHER_PRECIPITATION_API_KEY,
  WEATHER_TEMPERATURE_API_BASE,
  WEATHER_TEMPERATURE_API_KEY,
} from 'const'
import { getBrnoBikeAccidents } from 'services/accidents'
import { DayData, Month, WeatherPrecipitationResponse, WeatherTemperatureResponse, Year } from 'types'
import { getDayData, isNotNull } from 'utils'

const getDateObject = (d: Date) => ({
  date: d.getDate(),
  month: d.getMonth() as Month,
  year: (d.getFullYear() - OFFSET_YEAR) as Year,
})

const getDates = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  const yesterday = new Date(today)

  tomorrow.setDate(tomorrow.getDate() + 1)
  yesterday.setDate(yesterday.getDate() - 1)

  return [getDateObject(yesterday), getDateObject(today), getDateObject(tomorrow)] as const
}

const getTemperature = async (year: number): Promise<WeatherTemperatureResponse> => {
  const response = await axios.get(`${WEATHER_TEMPERATURE_API_BASE}temp-avg${getWeatherQuery(year)}`, {
    headers: {
      'x-apikey': WEATHER_TEMPERATURE_API_KEY,
    },
  })
  return response.data
}

const getWeatherQuery = (year: number) => `?q={%22year%22:%20${year}}`

const getPrecipitation = async (year: number): Promise<WeatherPrecipitationResponse> => {
  const response = await axios.get(`${WEATHER_PRECIPITATION_API_BASE}precipitation${getWeatherQuery(year)}`, {
    headers: {
      'x-apikey': WEATHER_PRECIPITATION_API_KEY,
    },
  })
  return response.data
}

const fetchWeatherDifferentYear = async (year: Year) => {
  return Promise.all([getTemperature(year), getPrecipitation(year)])
}

const getHomeData = async (): Promise<DayData[]> => {
  const now = new Date()
  const year = getDateObject(now).year

  const [brnoBikeAccidents, ...weatherToday] = await Promise.all([
    getBrnoBikeAccidents(),
    getTemperature(year),
    getPrecipitation(year),
  ])

  const [yesterday, today, tomorrow] = getDates()

  const weatherYesterday =
    yesterday.year !== today.year ? weatherToday : await fetchWeatherDifferentYear(yesterday.year)

  const weatherTomorrow = tomorrow.year !== today.year ? weatherToday : await fetchWeatherDifferentYear(tomorrow.year)

  const weathers = [weatherYesterday, weatherToday, weatherTomorrow]

  return getDates()
    .map((dateObject, i) => ({ ...dateObject, weather: weathers[i] }))
    .map(({ weather: [dateTemperatureResponse, datePrecipitationResponse], ...dateObject }) =>
      getDayData(
        dateObject,
        brnoBikeAccidents,
        dateTemperatureResponse[dateObject.month],
        datePrecipitationResponse[dateObject.month]
      )
    )
    .filter(isNotNull)
}

export const useHomeData = () => {
  const now = new Date()
  return useQuery(['home', now.getFullYear(), now.getMonth(), now.getDate()], getHomeData, {
    staleTime: Infinity,
  })
}
