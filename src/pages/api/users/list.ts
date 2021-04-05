// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { generateUserList } from '../../../utils/user-data'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const { page } = req.query;
  const list = generateUserList(+page);
  res.status(200).json({
    success: true,
    message: '',
    data: {
      list,
      total: list.length
    }
  })
}
