// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IUser, Role } from 'utils/types'
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser>
) {

  res.status(200).json({
    uid: 0,
    token: 'testwebrux',
    role: Role.SalesRepresentative,
  })
}
