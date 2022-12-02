import { cloneElement, FC } from 'react';

interface IProps {
    className?: string,
    ico: JSX.Element,
    fromValue: string | number,
    toValue: string | number,
    unit: string
}

export const MetricVisualisation: FC<IProps> = ({ className, ico, toValue, fromValue, unit }) => {

    return <div className={`flex my-2 items-center ${ className ? className : '' }`}>
        <div className='basis-10'>
            {cloneElement(ico, { className: 'fill-black h-6 mx-auto'})}
        </div>
        <div className={'basis-20'}></div>
        <div className={'bg-off-yellow py-1 rounded-lg basis-24 flex justify-center item-baseline text-lg'}>
            <span>{ fromValue }</span>
            <span className={'mx-2 opacity-30'}>-</span>
            <span>{ toValue }</span>
        </div>
        <span className={'text-lg ml-2'}>{ unit }</span>
    </div>
}