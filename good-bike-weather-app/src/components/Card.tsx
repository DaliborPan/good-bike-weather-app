import clsx from 'clsx'
import { FC } from 'react'

import { IcoRain, IcoTemperature } from './icons'
import { MetricVisualisation } from './MetricVisualisation'
import { RiskIndexGauge } from './RiskIndexGauge'
import { TransportImage } from './TransportImage'

import { DayData } from 'types'
import { useUserTransportType } from 'hooks/useUserTransportType'
import { getPrecipitationRange } from 'utils'

type Props = DayData & {
  title: string
  className?: string
  titleColor?: string // tailwind's text-*
}

export const Card: FC<Props> = ({ className = '', title, titleColor = 'text-light-green', ...dayData }) => {
  const [fromPrecip, toPrecip] = getPrecipitationRange(dayData.precipitation)

  const { getUserTransport } = useUserTransportType()

  return (
    <div className={clsx(`flex flex-col items-center gap-12 pt-10`, className)}>
      <h1 className={clsx('uppercase text-5xl font-light', titleColor)}>{title}</h1>

      <div className="h-[500px] w-[320px] rounded-lg bg-light-green flex flex-col justify-between shadow-lg">
        <TransportImage type={getUserTransport(dayData)} />
        <MetricVisualisation
          Icon={IcoTemperature}
          className={'px-5 mt-6'}
          fromValue={(dayData.temperature - 1).toFixed(1)}
          toValue={(dayData.temperature + 1).toFixed(1)}
          unit={'°C'}
        />
        <MetricVisualisation Icon={IcoRain} className={'px-5'} fromValue={fromPrecip} toValue={toPrecip} unit={'mm'} />
        <p className="px-5 mt-10 mb-2">Injury risk while riding a bicycle</p>
        <RiskIndexGauge riskIndex={dayData.index} className={'px-5 mb-8'} />
      </div>
    </div>
  )
}
