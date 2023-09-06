import { NextApiRequest, NextApiResponse } from 'next';

import api from '@/lib/pegaso';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const propertyId = req.query.propertyId;
    const { property } = await api.get(`/property/${propertyId}`);

    res.status(200).json(property);
  }
}
