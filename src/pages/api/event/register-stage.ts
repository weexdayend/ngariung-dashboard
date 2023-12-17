import { NextApiRequest, NextApiResponse } from 'next';

import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  UserID?: string;
  BusinessID?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const {
    EventStageName,
    EventStageDesc,
    EventID
  } = req.body

  try {

    const query = supabase
    .from('EventStages')
    .insert({
      EventStageName,
      EventStageDesc,
      EventID
    })
    .select()
    
  const TypeEvents: DbResult<typeof query> = await query

  res.status(201).json({ message: 'Event stage registered successfully', status: TypeEvents });

  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
