import type { NextPage } from 'next'
import { AppNavigation } from '../components/AppNavigation'
import { Card } from '../components/Card'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col absolute top-0 bottom-0 left-0 right-0 app-bg">
      <AppNavigation />

      <Card
        title={'Yesterday'}
        className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-[45%] scale-75"
      />

      <Card
        title={'Today'}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%]"
      />

      <Card
        title={'Tomorrow'}
        className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-[45%] scale-75"
      />
    </div>
  )
}

export default Home
