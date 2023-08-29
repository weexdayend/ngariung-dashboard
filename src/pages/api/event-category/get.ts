import { NextApiRequest, NextApiResponse } from 'next';

import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {

    const query = supabase.from('EventCategory').select()
    const TypeEvents: DbResult<typeof query> = await query
  
    res.status(200).json({ data: TypeEvents.data });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
