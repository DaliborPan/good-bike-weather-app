import type { NextPage } from 'next'
import { useSomething } from '../hooks/test'

const Home: NextPage = () => {
  const { data, isLoading, isError } = useSomething()

  if (isError) return <div>Error</div>

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col">
      <div className="container mx-auto px-10">
        <h1 className="text-red-800 font-bold">Hello world</h1>
        <h2 className="text-blue-600 font-light ">Subtitle</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data.numbers.map((number, i) => (
            <div key={`number-${i}`} className="text-blue-500">
              {number}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
