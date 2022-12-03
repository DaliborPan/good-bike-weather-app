import { FC } from 'react'

interface IProps {
  className?: string
}

export const Toolbar: FC<IProps> = ({ className }) => {
  return (
    <div
      className={`bg-light-green rounded-lg h-16 ${className ? className : ''}`}
    ></div>
  )
}
