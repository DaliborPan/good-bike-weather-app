import type { NextPage } from 'next'
import { AppNavigation } from '../../components/AppNavigation'
import { Card } from '../../components/Card'
import { useHomeData } from '../../hooks/home'

const Home: NextPage = () => {
  const { data, isLoading } = useHomeData()

  return (
    <div className="app-bg">
      <AppNavigation />

      {isLoading && <div>Loading</div>}

      {data && (
        <>
          <Card
            {...data[0]}
            title={'Yesterday'}
            className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-[45%] scale-75"
          />

          <Card
            {...data[1]}
            title={'Today'}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%]"
          />

          <Card
            {...data[2]}
            title={'Tomorrow'}
            titleColor="text-green"
            className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-[45%] scale-75"
          />
        </>
      )}
    </div>
  )
}

export default Home
