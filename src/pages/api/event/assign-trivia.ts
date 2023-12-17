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

  try {

    const { EventTriviaID, EventStageID } = req.body

    const query = supabase
      .from('EventTrivia')
      .update({
        EventStage: EventStageID
      })
      .eq("EventTriviaID", `${EventTriviaID}`)
    const TypeEvents: DbResult<typeof query> = await query
  
    res.status(200).json({ data: TypeEvents.data, message: 'Get event type successfully' });

  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
