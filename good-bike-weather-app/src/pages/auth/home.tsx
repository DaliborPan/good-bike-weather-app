import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'

const HomePage: NextPage = () => {
  const { data } = useSession()

  return (
    <div>
      <h1>Authorized page - Home</h1>
      <h2>{data?.user?.name ?? 'unknown'}</h2>
      <button
        className="mt-10 border border-blue-800 px-4 py-2 rounded"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  )
}

export default HomePage
