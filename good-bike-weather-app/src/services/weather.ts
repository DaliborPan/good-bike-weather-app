import axios from 'axios'
import {
  WEATHER_PRECIPITATION_API_BASE,
  WEATHER_PRECIPITATION_API_KEY,
  WEATHER_TEMPERATURE_API_BASE,
  WEATHER_TEMPERATURE_API_KEY,
} from '../const'

import { WeatherPrecipitationResponse, WeatherTemperatureResponse } from '../types'

export const getPrecipitationAllTime = async (): Promise<WeatherPrecipitationResponse> => {
  const response = await axios.get(`${WEATHER_PRECIPITATION_API_BASE}precipitation?q={}`, {
    headers: {
      'x-apikey': WEATHER_PRECIPITATION_API_KEY,
    },
  })
  return response.data
}

export const getTemperatureAllTime = async (): Promise<WeatherTemperatureResponse> => {
  const response = await axios.get(`${WEATHER_TEMPERATURE_API_BASE}temp-avg?q={}`, {
    headers: {
      'x-apikey': WEATHER_TEMPERATURE_API_KEY,
    },
  })

  return response.data
}
