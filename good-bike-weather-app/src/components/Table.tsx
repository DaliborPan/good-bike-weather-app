import { FC } from 'react';

interface IProps {
    className?: string
}

export const Table: FC<IProps> = ({ className }) => {

    return <div className={`${ className ? className : '' }`}>

    </div>
}