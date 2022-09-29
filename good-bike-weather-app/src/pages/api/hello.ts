// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { doSomething } from '../../services/test'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ numbers: number[] }>
) {
  const result = doSomething(1)
  res.status(200).json(result)
}
