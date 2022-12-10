import { FC, useCallback } from 'react'
import { Dialog } from './Dialog'
import Image from 'next/image'
import { RiskIndexGauge } from './RiskIndexGauge'
import { IcoRain, IcoTemperature } from './icons'
import { MetricVisualisation } from './MetricVisualisation'
import { DayData, Transport } from '../types'
import { RiskIndexExplanationInfo } from './RiskIndexExplanationInfo'
import moment from 'moment'

interface IProps {
  className?: string
  open: boolean
  onClose: () => void
  dayData: DayData | null
}

const messageBuilder = (recomendedTransport: Transport, riskIndex: number) => {
  if (recomendedTransport === 'BIKE' && riskIndex < 3) {
    return 'Today is a good day to ride a bike.'
  }
  if (recomendedTransport === 'BIKE' && riskIndex < 5) {
    return 'You can ride a bike but be careful.'
  }
  if (recomendedTransport === 'BIKE') {
    return 'Maybe you should take a bus today, but you can ride a bike if you are crazy enough.'
  }

  if (recomendedTransport === 'BUS' && riskIndex < 3) {
    return 'Bus is a good choice'
  }
  if (recomendedTransport === 'BUS' && riskIndex < 5) {
    return 'Today is bus recommended choice.'
  }
  if (recomendedTransport === 'BUS') {
    return 'Today is bus much better choice than bike.'
  }
  return 'No data'
}

export const EntityDetail: FC<IProps> = ({ className, open, onClose, dayData }) => {
  const prettyMessage = useCallback((message: string) => message.charAt(0).toUpperCase() + message.slice(1), [])

  return (
    <Dialog className={`w-[50rem] h-[26rem] max-w-[80vw] max-h-[90vh] ${className}`} open={open} onClose={onClose}>
      <div className={'flex h-full gap-4 grow-0 overflow-hidden justify-start'}>
        {/* /* LEFT PART */}
        <div className="flex flex-col basis-80 shrink-0 grow-0">
          <Image src="/images/bicycle.png" alt={'Bicycle image'} className="rounded-tl-lg" width={384} height={200} />
          <div className="flex flex-wrap items-center justify-center grow content-center">
            <h2 className="text-lg mb-2 basis-auto">Injury risk while riding a bicycle</h2>
            <RiskIndexExplanationInfo className="basis-auto mb-2 ml-2 h-5 w-5" />
            <RiskIndexGauge riskIndex={dayData?.index || 1} className={'w-full px-5'} />
          </div>
        </div>

        {/* /* RIGHT PART */}
        <div className="flex flex-col grow items-center justify-around">
          <h1 className="text-2xl mt-4">{dayData ? moment(dayData?.date).format('LL') : ''}</h1>
          <div className="w-11/12 flex justify-around">
            <MetricVisualisation
              Icon={IcoTemperature}
              className={''}
              fromValue={dayData?.temperature || '0'}
              unit={'°C'}
            />
            <MetricVisualisation Icon={IcoRain} className={''} fromValue={dayData?.precipitation || '0'} unit={'mm'} />
          </div>
          <div className="w-11/12 bg-whiskey px-3 py-1 text-white rounded-lg">
            {dayData ? messageBuilder(dayData.transport, dayData.index) : 'No data'}
          </div>
          <div className="w-11/12 h-2/5 flex flex-col">
            <h2>Local bicycle accidents ({dayData?.accidents.length || 0})</h2>
            <div className="bg-light-green w-full rounded-lg grow p-3 overflow-auto">
              {dayData?.accidents.map((accident, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <div className="rounded-full shrink-0 mt-0.5 h-6 w-6 text-white bg-whiskey flex justify-center items-center">
                    {index}
                  </div>
                  <div>
                    {prettyMessage(accident.attributes.nasledky)}
                    <br />
                    <span className="text-black/70">{prettyMessage(accident.attributes.pricina)}</span>
                  </div>
                </div>
              ))}
              {!dayData?.accidents.length && <div className="text-center">No accidents</div>}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
