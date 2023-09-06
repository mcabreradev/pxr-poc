import { NextApiRequest, NextApiResponse } from 'next';

import { getFirstOwnProperty } from '@/lib/helper';
import api from '@/lib/pegaso';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { propertyId, roomTypeId } = req.query;
    const { roomTypes } = await api.get(
      `/property/${propertyId}/roomtype/${roomTypeId}`,
    );
    const room = getFirstOwnProperty(roomTypes);
    res.status(200).json(room);
  }
}
