import axios from 'axios'
import { API_BRNO_BIKE_ACCIDENTS } from '../const'
import { BrnoBikeAccidentsResponse } from '../types'

export const getBrnoBikeAccidents = async (): Promise<BrnoBikeAccidentsResponse> => {
  const response = await axios.get(API_BRNO_BIKE_ACCIDENTS)

  return response.data.features
}
