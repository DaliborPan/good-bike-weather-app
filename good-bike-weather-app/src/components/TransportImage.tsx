import Image, { StaticImageData } from 'next/image'

import { Transport } from 'types'

import BIKE_IMAGE from '../../public/images/bicycle.png'
import CAR_IMAGE from '../../public/images/car.jpeg'
import BUS_IMAGE from '../../public/images/bus.png'

type TransportImageProps = {
  type: Transport
}

const IMAGE_MAPPING: {
  [key in Transport]: StaticImageData
} = {
  BIKE: BIKE_IMAGE,
  BUS: BUS_IMAGE,
  CAR: CAR_IMAGE,
}

export const TransportImage: React.FC<TransportImageProps> = ({ type }) => (
  <div className="relative w-full h-52">
    <Image src={IMAGE_MAPPING[type]} alt="Transport image" fill className="rounded-tl-lg rounded-tr-lg" />
  </div>
)
