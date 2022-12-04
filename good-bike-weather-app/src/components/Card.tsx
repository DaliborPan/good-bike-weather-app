import Image from 'next/image'
import { FC } from 'react'
import { IcoRain } from './icons/IcoRain'
import { IcoTemperature } from './icons/IcoTemperature'
import { MetricVisualisation } from './MetricVisualisation'
import { RiskIndexGauge } from './RiskIndexGauge'

interface IProps {
  title: string
  className?: string
}

export const Card: FC<IProps> = ({ className, title }) => {
  return (
    <div className={`flex flex-col items-center gap-12 pt-10 ${className ? className : ''}`}>
      <h1 className="uppercase text-5xl font-light text-light-green">{title}</h1>
      <div className="h-[500px] w-[320px] rounded-lg bg-light-green flex flex-col justify-between">
        <div className="relative w-full h-52">
          <Image
            src="/images/bicycle.png"
            layout="fill"
            objectFit="cover"
            alt={'Bicycle image'}
            className="rounded-tl-lg rounded-tr-lg"
          />
        </div>
        <MetricVisualisation
          ico={<IcoTemperature />}
          className={'px-5 mt-6'}
          fromValue={'10'}
          toValue={'15'}
          unit={'°C'}
        />
        <MetricVisualisation ico={<IcoRain />} className={'px-5'} fromValue={'0'} toValue={'2'} unit={'mm'} />
        <p className="px-5 mt-10 mb-2">Injury risk while riding a bicycle</p>
        <RiskIndexGauge riskIndex={5} className={'px-5 mb-8'} />
      </div>
    </div>
  )
}
