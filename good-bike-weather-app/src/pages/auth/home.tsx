import type { NextPage } from 'next'
import { AppNavigation } from '../../components/AppNavigation'
import { Card } from '../../components/Card'
import { useHomeData } from '../../hooks/home'

const Home: NextPage = () => {
  const { data } = useHomeData()

  // eslint-disable-next-line no-console
  console.log(data)

  return (
    <div className="app-bg">
      <AppNavigation />

      <Card title={'Yesterday'} className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-[45%] scale-75" />

      <Card title={'Today'} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%]" />

      <Card title={'Tomorrow'} className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-[45%] scale-75" />
    </div>
  )
}

export default Home
