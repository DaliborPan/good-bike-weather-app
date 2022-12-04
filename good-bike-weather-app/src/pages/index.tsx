import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-off-yellow flex flex-col">
      <div className="container mx-auto w-full">
        <h1>Landing page</h1>
        <button className="mt-10 px-4 py-2 bg-whiskey text-off-yellow rounded" onClick={() => signIn('google')}>
          Sign in with google
        </button>
      </div>
    </div>
  )
}

export default Home
