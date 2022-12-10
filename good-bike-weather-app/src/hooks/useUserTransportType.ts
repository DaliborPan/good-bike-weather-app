import { useState, useEffect } from 'react'
import { DayData, Transport, ProfileSettingsType } from '../types'
import { getPrecipitationRange } from '../utils'
import { useLocalstoragePreferences } from './useLocalstoragePreferences'

const checkTemperatureForBike = (userTemp: boolean[], temperature: number) =>
  (temperature <= 0 && userTemp[0]) || (0 < temperature && temperature <= 10 && userTemp[1])

const checkPrecipitationForBike = (userPrecip: boolean[], maxPrecip: number) =>
  (maxPrecip <= 5 && userPrecip.some((v) => v)) ||
  (maxPrecip <= 10 && (userPrecip[1] || userPrecip[2])) ||
  (maxPrecip > 10 && userPrecip[2])

const getDefaultTransport = ({ precipitation, temperature }: DayData): Transport => {
  if (temperature < 0) return 'CAR'
  if (precipitation < 10 && temperature > 10) return 'BIKE'

  return 'BUS'
}

/**
 * Logic
 *  - If precipitation does satisfy user's preferences, user will ride a bike or take a bus (good temperature => BIKE, else BUS)
 *  - If precipitation does not satisfy user's preferences, user will drive a car or take a bus (adult user => CAR, else BUS)
 *
 *  We don't want user to drive a car, if there will not be enough precipitation according to his preferences.
 */
const determinePreferredTransport = (
  { age, precip: userPrecip, temp: userTemp }: ProfileSettingsType,
  { precipitation, temperature }: DayData
) => {
  const [, maxPrecip] = getPrecipitationRange(precipitation)

  if (checkPrecipitationForBike(userPrecip, maxPrecip)) {
    if (checkTemperatureForBike(userTemp, temperature)) {
      return 'BIKE'
    }

    return 'BUS'
  }

  if (age && age >= 18) return 'CAR'

  return 'BUS'
}

export const useUserTransportType = (dayData: DayData): Transport => {
  const [localstorageValues] = useLocalstoragePreferences()
  const [transport, setTransport] = useState<Transport | undefined>(undefined)

  useEffect(() => {
    if (!localstorageValues) return

    setTransport(determinePreferredTransport(localstorageValues, dayData))
  }, [localstorageValues, dayData])

  return transport ?? getDefaultTransport(dayData)
}
