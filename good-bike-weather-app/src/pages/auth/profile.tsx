import { useCallback } from 'react'
import clsx from 'clsx'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Form, Formik, useFormikContext } from 'formik'

import { AppNavigation } from 'components/AppNavigation'
import AVATAR_IMAGE from '/public/images/avatar.png'
import { KeysHasValue, ProfileSettingsType } from 'types'
import { IcoCloudSun, IcoCloud, IcoRain, IcoBigRain, IcoTemperatureLow, IcoSun, IcoFloppyDisk } from 'components/icons'
import { LOCALSTORAGE_PREFERENCES_KEY, useLocalstoragePreferences } from 'hooks/useLocalstoragePreferences'

const PRECIPITATION_OPTIONS = [
  {
    Icon: IcoCloud,
    label: '< 5 mm',
  },
  {
    Icon: IcoRain,
    label: '< 10 mm',
  },
  {
    Icon: IcoBigRain,
    label: '10+ mm',
  },
]

const TEMPERATURE_OPTIONS = [
  {
    Icon: IcoTemperatureLow,
    label: '< 0 °C',
  },
  {
    Icon: IcoCloudSun,
    label: '< 10 °C',
  },
  {
    Icon: IcoSun,
    label: '10+ °C',
  },
]

const INITIAL_VALUES = {
  age: null,
  temp: [false, false, false],
  precip: [false, false, false],
}

const AgeInput: React.FC = () => {
  const {
    setFieldValue,
    values: { age },
  } = useFormikContext<ProfileSettingsType>()

  return (
    <div className="relative">
      <label htmlFor="age" className="absolute -top-7 text-dark-green">
        Age
      </label>
      <input
        id="age"
        name="age"
        className="text-right pr-4 py-1.5 text-2xl bg-off-yellow text-whiskey rounded-lg focus-within:outline-none focus-within:ring-1 focus-within:ring-whiskey"
        type="number"
        onChange={(e) => setFieldValue('age', +e.target.value)}
        value={age ? (age as number) : ''}
      />
    </div>
  )
}

const MotivationText = () => (
  <p className="p-10 bg-champagne/40 text-dark-green rounded-lg shadow-md">
    If you provide us with your preferences, we can tailor the forecast to your needs. By keeping your preferences in
    mind, we can ensure that the forecast is as accurate and relevant as possible for you. This will help you stay up to
    date and prepared for whatever the weather may bring. So go ahead and submit your preferences to us today, and let
    us help you stay one step ahead of the forecast.
  </p>
)

const Avatar = () => {
  const { data } = useSession()

  const name = data?.user?.name

  return (
    <div className="flex space-x-12">
      <div className="h-40 w-40 rounded-full bg-champagne/40">
        <Image height={180} src={AVATAR_IMAGE} alt="" className="-mt-4" />
      </div>

      <div className="flex flex-col justify-between py-2">
        <h2 className="text-4xl text-whiskey font-bold">{name}</h2>
        <AgeInput />
      </div>
    </div>
  )
}

type WeatherOptionsGroupProps = {
  options: typeof TEMPERATURE_OPTIONS
  name: KeysHasValue<ProfileSettingsType, boolean[]>
}

const WeatherOptionsGroup: React.FC<WeatherOptionsGroupProps> = ({ options, name }) => {
  const { values, setFieldValue } = useFormikContext<ProfileSettingsType>()

  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-x-4">
        {options.map((option, i) => (
          <WeatherOptionButton
            {...option}
            key={`${name}-${i}`}
            active={values[name][i]}
            onClick={() =>
              setFieldValue(
                name,
                values[name].map((v, index) => (index === i ? !v : v))
              )
            }
          />
        ))}
      </div>
      <div className="text-whiskey font-extralight text-xs pt-2">You can select multiple options</div>
    </div>
  )
}

type WeatherOptionButtonProps = typeof TEMPERATURE_OPTIONS[0] & {
  active: boolean
  onClick: () => void
}

const WeatherOptionButton: React.FC<WeatherOptionButtonProps> = ({ Icon, label, active, onClick }) => (
  <button
    className={clsx(
      'flex flex-col items-center justify-between py-3 bg-off-yellow rounded-lg text-2xl whitespace-nowrap aspect-square relative',
      active && 'ring ring-whiskey'
    )}
    onClick={onClick}
  >
    {active && <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-whiskey" />}
    <Icon height={52} className="p-1" />
    <span>{label}</span>
  </button>
)

const SavePreferencesButton = () => (
  <div className="flex justify-end">
    <button className="flex items-center justify-center space-x-6 bg-green rounded py-3 px-6 shadow-lg hover:shadow-xl">
      <IcoFloppyDisk height={30} fill="#FEFAE0" />
      <span className="text-lg text-off-yellow">Save your preferences</span>
    </button>
  </div>
)

const PreferencesSelection = () => (
  <>
    <div className="grow flex flex-col space-y-6 2xl:space-y-8 pt-6 2xl:pt-12">
      <WeatherOptionsGroup options={TEMPERATURE_OPTIONS} name="temp" />
      <WeatherOptionsGroup options={PRECIPITATION_OPTIONS} name="precip" />
    </div>
    <SavePreferencesButton />
  </>
)

const ProfilePage: NextPage = () => {
  const [localstorageValues, setLocalstorageValues] = useLocalstoragePreferences()

  const onFormSubmit = useCallback(
    (values: ProfileSettingsType) => {
      setLocalstorageValues(values)
      localStorage.setItem(LOCALSTORAGE_PREFERENCES_KEY, JSON.stringify(values))
    },
    [setLocalstorageValues]
  )

  return (
    <div className="app-bg">
      <AppNavigation />
      <h1 className="flex w-1/2 text-light-green text-4xl font-extralight pt-4">Your profile & settings</h1>

      <Formik initialValues={localstorageValues ?? INITIAL_VALUES} onSubmit={onFormSubmit} enableReinitialize>
        <Form className="flex flex-col bg-light-green w-11/12 xl:w-3/4 rounded-lg p-8 mb-8 h-full">
          <div className="flex justify-center h-full space-x-20">
            <div className="flex flex-col space-y-16 h-full w-1/2">
              <Avatar />
              <MotivationText />
            </div>
            <div className="flex flex-col py-2">
              <h3 className="text-3xl text-green font-semibold">{"I love to ride a bike, when it's..."}</h3>
              <PreferencesSelection />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ProfilePage
