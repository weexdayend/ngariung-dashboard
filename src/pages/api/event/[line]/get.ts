import { NextApiRequest, NextApiResponse } from 'next';

import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  UserID?: string;
  BusinessID?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {

    const { line } = req.query

    if (line == 'type') {
      const query = supabase.from('EventTypes').select()
      const TypeEvents: DbResult<typeof query> = await query
    
      res.status(200).json({ data: TypeEvents.data, message: 'Get event type successfully' });
    }

    if (line == 'category') {
      const query = supabase.from('EventCategories').select()
      const TypeEvents: DbResult<typeof query> = await query
    
      res.status(200).json({ data: TypeEvents.data, message: 'Get event categories successfully' });
    }

  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
