import clsx from 'clsx'
import { FC, SVGProps } from 'react'

interface IProps {
  className?: string
  Icon: FC<SVGProps<SVGSVGElement>>
  fromValue: string | number
  toValue?: string | number
  unit: string
}

export const MetricVisualisation: FC<IProps> = ({ className, Icon, toValue, fromValue, unit }) => {
  const hasToValue = toValue !== undefined && toValue !== 0

  return (
    <div className={`flex items-center mx-4 my-2 ${className ? className : ''}`}>
      <div className="w-1/3 mr-3 flex items-center">
        <Icon fill="black" className="h-6" />
      </div>
      <div className="grow flex items-center">
        <div className={'bg-off-yellow flex items-center justify-center py-1 rounded-lg text-lg w-2/3'}>
          <span className={clsx(!hasToValue && 'px-4')}>{fromValue}</span>
          {hasToValue && (
            <>
              <span className={'mx-2 opacity-30'}>{+toValue === 0 ? ' ' : '-'}</span>
              <span>{+toValue}</span>
            </>
          )}
        </div>
        <span className={'text-lg ml-2'}>{unit}</span>
      </div>
    </div>
  )
}
