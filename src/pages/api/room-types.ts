import { NextApiRequest, NextApiResponse } from 'next';

import api from '@/lib/pegaso';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const propertyId = req.query.propertyId;
    const { roomTypes } = await api.get(`/property/${propertyId}/roomtypes`);

    res.status(200).json(Object.values(roomTypes));
  }
}
