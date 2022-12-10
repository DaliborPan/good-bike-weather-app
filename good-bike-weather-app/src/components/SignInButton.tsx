import clsx from 'clsx'
import { signIn } from 'next-auth/react'
import { IcoChevronRight } from './icons'

type SignInButtonProps = {
  extraClasses?: string
}

export const SignInButton: React.FC<SignInButtonProps> = ({ extraClasses }) => {
  return (
    <button
      className={clsx(
        'flex items-center space-x-4 justify-center bg-whiskey px-5 py-2.5 text-lg rounded-lg shadow-md text-off-yellow hover:text-white hover:transform hover:translate-x-4 hover:duration-300 hover:shadow-lg',
        extraClasses
      )}
      onClick={() => signIn('google')}
    >
      <div>Sign in with google now</div>
      <IcoChevronRight fill="white" height={18} />
    </button>
  )
}
