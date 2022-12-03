import { NextPage } from 'next'
import { signIn } from 'next-auth/react'

const SignInPage: NextPage = () => {
  return (
    <div>
      <h1>Sign in page</h1>
      <button
        className="mt-10 border border-blue-800 px-4 py-2 rounded"
        onClick={() => signIn('google')}
      >
        Sign in with google
      </button>
    </div>
  )
}

export default SignInPage
