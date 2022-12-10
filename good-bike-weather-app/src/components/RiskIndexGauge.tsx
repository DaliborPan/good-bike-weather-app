import { FC } from 'react'
import { DANGER_INDICES } from '../const'
import { DangerIndex } from '../types'

interface IProps {
  className?: string
  riskIndex: DangerIndex
}

export const RiskIndexGauge: FC<IProps> = ({ className, riskIndex }) => {
  return (
    <div className={`w-full py-2 ${className ? className : ''}`}>
      <div className={'w-full bg-off-yellow rounded-md flex justify-between px-6 py-1.5 text-lg'}>
        {DANGER_INDICES.map((index) => (
          <span
            key={index}
            className={`relative ${
              riskIndex === index
                ? 'after:content-[""] after:absolute after:h-[48px] after:w-8  after:top-1/2 after:rounded-lg after:-translate-x-1/2 after:-translate-y-1/2 after:left-1/2 after:border-2 after:border-green'
                : 'opacity-30'
            }`}
          >
            {index}
          </span>
        ))}
      </div>
    </div>
  )
}
