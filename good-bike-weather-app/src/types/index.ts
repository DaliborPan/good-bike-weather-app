import { EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE, MONTHS, YEARS, DANGER_INDICES, TRANSPORT_TYPES } from '../const';

export type BrnoBikeAccidentsResponse = typeof EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE[]

// Empty string if invalid date for month, eg. 30.2.2022, else number
export type MetricValue = '' | number

export type WeatherPrecipitationResponse = ({
  [key in number]: MetricValue
} & {
  month: Month
  year: Year
})[]

export type WeatherTemperatureResponse = WeatherPrecipitationResponse
export type Year = typeof YEARS[number]
export type Month = typeof MONTHS[number]
export type DangerIndex = typeof DANGER_INDICES[number]
export type Transport = typeof TRANSPORT_TYPES[number]

export type HistoryPageData = {
  year: Year
  month: Month
  day: number
  temperature: number
  precipitation: number
  index: DangerIndex
  transport: Transport
  accidents: BrnoBikeAccidentsResponse,
  date: string
}
