import type { NextPage } from 'next'

const Home: NextPage = () => {
  return <div className='min-h-screen bg-slate-300 flex flex-col'>
    <div className="container mx-auto px-10">
      <h1 className='text-red-800 font-bold'>Hello world</h1>
      <h2 className='text-blue-600 font-light '>Subtitle</h2>
    </div>
  </div>
}

export default Home
