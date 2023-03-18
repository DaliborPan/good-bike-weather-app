import type { NextPage } from 'next'
import { FC, SVGProps } from 'react'
import Image from 'next/image'

import HERO_CARD from '/public/images/hero-card.png'
import HERO_DETAIL from '/public/images/detail.png'
import { SignInButton } from 'components/SignInButton'
import { IcoPersonBiking, IcoCloudSun, IcoCircleInfo, IcoUserGroup } from 'components/icons'

type MiniCardProps = {
  text: string
  Icon: FC<SVGProps<SVGSVGElement>>
}

const MiniCard: React.FC<MiniCardProps> = ({ text, Icon }) => {
  return (
    <div className="flex flex-col p-4 bg-light-green rounded-lg space-y-4 justify-start w-36 shadow border border-green/20">
      <div>
        <Icon fill="#283618" height={30} />
      </div>
      <p className="text-sm text-dark-green">{text}</p>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div className="app-bg">
      <div className="container mx-auto w-full px-10 h-full">
        <div className="flex h-full">
          <div className="w-3/4 flex flex-col h-full">
            <h1 className="mt-20 text-6xl text-off-yellow font-bold">Have a safe ride!</h1>
            <p className="mb-10 mt-5 text-xl max-w-sm text-dark-green md:text-white/70 shadow-lg px-6 py-4 border border-dark-green/30 rounded-lg">
              {'We will tell you, when it’s safe to ride a bike in Brno. We know the future!'}
            </p>
            <div>
              <SignInButton />
            </div>

            <div className="mt-auto relative mb-2">
              <h2 className="text-2xl text-light-green bg-dark-green shadow-lg inline-block mb-6 px-8 py-2 rounded-lg">
                Keeping you safe and informed
              </h2>
              <div className="flex space-x-6">
                <MiniCard text="All bike accidents that will happen in Brno" Icon={IcoPersonBiking} />
                <MiniCard text="Weather prediction for the next 10 years!" Icon={IcoCloudSun} />
                <MiniCard text="Calculation of danger index of riding a bicycle" Icon={IcoCircleInfo} />
                <MiniCard text="Transport type based on your preferences" Icon={IcoUserGroup} />
              </div>
            </div>
          </div>

          <div className="grow relative">
            <div className="absolute top-72 -right-3 rotate-6 z-10">
              <Image src={HERO_CARD} alt="" height={400} />
            </div>
            <div className="hidden md:block absolute top-10 -left-96 -rotate-3 rounded-lg bg-gradient-to-r from-champagne/70 m-1 to-green p-1 shadow-lg hover:transition-all hover:-translate-x-20 hover:duration-500">
              <Image src={HERO_DETAIL} alt="" height={300} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
