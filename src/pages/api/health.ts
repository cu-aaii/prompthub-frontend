import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Example response
  res.status(200).json({ status: 'ok', message: 'Health check passed!' });
}