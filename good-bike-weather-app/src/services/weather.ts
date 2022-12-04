import axios from 'axios'
import { WeatherPrecipitationResponse, WeatherTemperatureResponse } from '../types'

const WEATHER_PRECIPITATION_API_BASE = process.env.NEXT_PUBLIC_WEATHER_API_BASE
const WEATHER_TEMPERATURE_API_BASE = process.env.NEXT_PUBLIC_WEATHER_TEMPERATURE_API_BASE
const WEATHER_PRECIPITATION_API_KEY = process.env.NEXT_PUBLIC_WEATHER_PRECIPITATION_API_KEY
const WEATHER_TEMPERATURE_API_KEY = process.env.NEXT_PUBLIC_WEATHER_TEMPERATURE_API_KEY

export const getPrecipitationAllTime = async (): Promise<WeatherPrecipitationResponse> => {
  const response = await axios.get(`${WEATHER_PRECIPITATION_API_BASE}precipitation?q={}`, {
    headers: {
      'x-apikey': WEATHER_PRECIPITATION_API_KEY as string,
    },
  })
  return response.data
}

export const getTemperatureAllTime = async (): Promise<WeatherTemperatureResponse> => {
  const response = await axios.get(`${WEATHER_TEMPERATURE_API_BASE}temp-avg?q={}`, {
    headers: {
      'x-apikey': WEATHER_TEMPERATURE_API_KEY as string,
    },
  })

  return response.data
}
