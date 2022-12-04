import axios from 'axios'
import { API_BRNO_BIKE_ACCIDENTS, API_BRNO_BIKE_ACCIDENTS_DEV } from '../const'
import { BrnoBikeAccidentsResponse } from '../types'

export const getBrnoBikeAccidents = async (): Promise<BrnoBikeAccidentsResponse> => {
  const response = await axios.get(
    process.env.NODE_ENV === 'development' ? API_BRNO_BIKE_ACCIDENTS_DEV : API_BRNO_BIKE_ACCIDENTS
  )

  return response.data.features
}
