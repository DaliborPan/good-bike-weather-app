import { useState, useEffect, useCallback } from 'react'
import { ProfileSettingsType } from 'types'

const LOCALSTORAGE_PREFERENCES_KEY = 'userPreferences'

const INITIAL_VALUES: ProfileSettingsType = {
  age: null,
  temp: [true, false, false],
  precip: [true, false, false],
}

export const usePreferencesForm = () => {
  const [initialValues, setInitialValues] = useState<ProfileSettingsType>(INITIAL_VALUES)

  useEffect(() => {
    const foundValues = localStorage.getItem(LOCALSTORAGE_PREFERENCES_KEY)

    if (foundValues) {
      setInitialValues(JSON.parse(foundValues) as ProfileSettingsType)
    }
  }, [])

  const onFormSubmit = useCallback((values: ProfileSettingsType) => {
    localStorage.setItem(LOCALSTORAGE_PREFERENCES_KEY, JSON.stringify(values))
  }, [])

  return { initialValues, onFormSubmit } as const
}
