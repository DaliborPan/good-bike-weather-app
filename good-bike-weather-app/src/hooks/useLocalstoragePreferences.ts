import { useState, useEffect } from 'react'
import { ProfileSettingsType } from 'types'

export const LOCALSTORAGE_PREFERENCES_KEY = 'userPreferences'

const INITIAL_VALUES = {
  age: null,
  temp: [false, false, false],
  precip: [false, false, false],
}

export const usePreferencesInitialValues = () => {
  const [initialValues, setInitialValues] = useState<ProfileSettingsType>(INITIAL_VALUES)

  // TODO: Create setter here (setState and localstorage as well)

  useEffect(() => {
    const foundValues = localStorage.getItem(LOCALSTORAGE_PREFERENCES_KEY)

    if (foundValues) {
      setInitialValues(JSON.parse(foundValues) as ProfileSettingsType)
    }
  }, [])

  return [initialValues, setInitialValues] as const
}
