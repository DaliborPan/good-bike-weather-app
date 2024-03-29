import { Tooltip } from '@mui/material'
import clsx from 'clsx'
import { FC } from 'react'
import { IcoInfo } from './icons'

type Props = {
  className?: string
}

type RiskExplanation = {
  index: string
  title: string
  description: string
  background: string
}

const RISK_EXPLANATION: RiskExplanation[] = [
  {
    index: '1 - 3',
    title: 'Low risk',
    description: 'There is almost no danger. Make yourself happy and cycle twice as much today.',
    background: 'bg-risk-low',
  },
  {
    index: '5 - 6',
    title: 'Normal risk',
    description:
      'Be careful. Today the conditions are not exactly ideal for cycling, but if you are more careful you will still reach your destination safely.',
    background: 'bg-risk-medium',
  },
  {
    index: '7 - 9',
    title: 'High risk',
    description:
      'If you ride your bike, please contact the nearest psychiatric hospital, as it looks like you are suicidal.',
    background: 'bg-risk-high',
  },
]

export const RiskIndexExplanationInfo: FC<Props> = ({ className = '' }) => {
  return (
    <Tooltip
      title={
        <div className={'flex flex-col items-start gap-2'}>
          {RISK_EXPLANATION.map((risk) => (
            <div key={risk.index}>
              <div>
                <span className={clsx('text-white px-1.5 py-0.5 rounded-md min-w-max', risk.background)}>
                  {risk.index}
                </span>
                <span className="text-white min-w-max font-semibold ml-2 text-md">{risk.title}</span>
              </div>
              <p className="text-white">{risk.description}</p>
            </div>
          ))}
        </div>
      }
      placement="top"
    >
      <span className={clsx('h-3', className)}>
        <IcoInfo className="fill-whiskey h-full" />
      </span>
    </Tooltip>
  )
}
