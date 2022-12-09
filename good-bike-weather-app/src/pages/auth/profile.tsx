import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { AppNavigation } from '../../components/AppNavigation'
import AVATAR_IMAGE from '../../../public/images/avatar.png'
import { Form, Formik, useFormikContext } from 'formik'
import { IcoRain } from '../../components/icons/IcoRain'
import { KeysHasValue } from '../../types'
import clsx from 'clsx'

const TEMPERATURE_OPTIONS = [
  {
    Icon: IcoRain,
    label: '< 5 mm',
  },
  {
    Icon: IcoRain,
    label: '< 10 mm',
  },
  {
    Icon: IcoRain,
    label: '10+ mm',
  },
]

const PRECIPITATION_OPTIONS = [
  {
    Icon: IcoRain,
    label: '< 0 °C',
  },
  {
    Icon: IcoRain,
    label: '< 10 °C',
  },
  {
    Icon: IcoRain,
    label: '10+ °C',
  },
]

const AgeInput: React.FC = () => {
  const { setFieldValue } = useFormikContext<ProfileSettingsType>()

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

// Store in localstorage
// - useAvatar: boolean
// - tempPreferences: (0 | 1 | 2)[]
// - precipPreferences: (0 | 1 | 2)[]
// - age: number

const Avatar: React.FC = () => {
  const { data } = useSession()

  const name = data?.user?.name

  return (
    <div className="flex space-x-12">
      {/* Image */}
      <div className="h-40 w-40 rounded-full bg-champagne/40">
        <Image height={180} src={AVATAR_IMAGE} alt="" className="-mt-4" />
      </div>

      {/* Name + age */}
      <div className="flex flex-col justify-between py-2">
        <h2 className="text-4xl text-whiskey font-bold">{name}</h2>
        <AgeInput />
      </div>
    </div>
  )
}

type WeatherOptionsGroupProps = {
  options: typeof TEMPERATURE_OPTIONS
  name: KeysHasValue<ProfileSettingsType, [boolean, boolean, boolean]>
  extraClasses?: string
}

const WeatherOptionsGroup: React.FC<WeatherOptionsGroupProps> = ({ options, name, extraClasses = '' }) => {
  const { values, setFieldValue } = useFormikContext<ProfileSettingsType>()

  return (
    <div>
      <div className={clsx('w-full grid grid-cols-3 gap-x-4', extraClasses)}>
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
    <div className="w-10 pt-1">
      <Icon />
    </div>
    <span>{label}</span>
  </button>
)

const SavePreferencesButton = () => {
  return (
    <div className="flex justify-end">
      <button className="flex items-center justify-center space-x-6 bg-green rounded py-3 px-6 hover:shadow-lg">
        {/* Save Icon */}
        <div className="w-8">
          <IcoRain />
        </div>
        <span className="text-lg text-off-yellow">Save your preferences</span>
      </button>
    </div>
  )
}

const PreferencesSelection: React.FC = () => {
  return (
    <>
      <div className="grow flex flex-col space-y-6 2xl:space-y-8 pt-6 2xl:pt-12">
        <WeatherOptionsGroup options={TEMPERATURE_OPTIONS} name="temp" />
        <WeatherOptionsGroup options={PRECIPITATION_OPTIONS} name="precip" />
      </div>
      <SavePreferencesButton />
    </>
  )
}

type ProfileSettingsType = {
  age: number | null
  temp: [boolean, boolean, boolean]
  precip: [boolean, boolean, boolean]
}

const INITIAL_VALUES = {
  age: null,
  temp: [false, false, false],
  precip: [false, false, false],
}

const ProfilePage: NextPage = () => {
  // TODO: Initial state from localstorage
  const localstorageValues: ProfileSettingsType | undefined = undefined

  return (
    <div className="app-bg">
      <AppNavigation />
      <h1 className="flex w-1/2 text-light-green text-4xl font-extralight pt-8">Your profile & settings</h1>

      <Formik
        initialValues={localstorageValues ?? INITIAL_VALUES}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit={(values) => {
          return undefined
        }}
      >
        <Form className="flex flex-col bg-light-green w-11/12 xl:w-3/4 rounded-lg p-12 mb-8 h-full">
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
