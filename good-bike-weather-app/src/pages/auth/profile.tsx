import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { AppNavigation } from '../../components/AppNavigation'
import AVATAR_IMAGE from '../../../public/images/avatar.png'
import { Form, Formik, useFormikContext } from 'formik'

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

const MotivationText = () => {
  return (
    <p className="p-10 bg-champagne/40 text-dark-green rounded-lg shadow-md">
      If you provide us with your preferences, we can tailor the forecast to your needs. By keeping your preferences in
      mind, we can ensure that the forecast is as accurate and relevant as possible for you. This will help you stay up
      to date and prepared for whatever the weather may bring. So go ahead and submit your preferences to us today, and
      let us help you stay one step ahead of the forecast.
    </p>
  )
}

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
        <Form className="grow flex flex-col bg-light-green rounded-lg w-11/12 overflow-hidden p-12 mb-8 h-full">
          <div className="flex h-full justify-between">
            <div className="flex flex-col space-y-16 h-full w-1/2">
              <Avatar />
              <MotivationText />
            </div>
            <div className="flex flex-col">
              <h3>heading</h3>
              <div>temps</div>
              <div className="grow">precips</div>
              <button>submit btn</button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ProfilePage
