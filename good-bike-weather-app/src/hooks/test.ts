import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type SomethingData = {
  numbers: number[]
}

const getSomething = async () => {
  const response = await axios.get('/api/hello')
  return response.data as SomethingData
}

export const useSomething = () => {
  return useQuery(['some-key'], getSomething, {
    staleTime: 60 * 10,
  })
}
