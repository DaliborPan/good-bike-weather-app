import { useState, useEffect } from 'react'
import { ProfileSettingsType } from 'types'

export const LOCALSTORAGE_PREFERENCES_KEY = 'userPreferences'

export const useLocalstoragePreferences = () => {
  const [localstorageValues, setLocalstorageValues] = useState<ProfileSettingsType | undefined>(undefined)

  useEffect(() => {
    const foundValues: string | null = localStorage.getItem(LOCALSTORAGE_PREFERENCES_KEY)
    setLocalstorageValues(JSON.parse(foundValues ?? 'null') as ProfileSettingsType)
  }, [])

  return [localstorageValues, setLocalstorageValues] as const
}
