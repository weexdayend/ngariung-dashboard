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
    line
  } = req.query

  try {
    const BusinessID = req.BusinessID; 
    if (!BusinessID || BusinessID === null) {
      return res.status(401).json({ error: 'Invalid BusinessID' });
    }

    const {
      id,
      name,
      status,
    } = req.body
    
    if (line == 'type') {
      const query = supabase
        .from('EventTypes')
        .update({
          EventTypeName: name,
          EventTypeStatus: status
        })
        .eq('EventTypeID', id)
        .select()
        
      const TypeEvents: DbResult<typeof query> = await query
    
      res.status(201).json({ message: 'Event type registered successfully', status: TypeEvents.error });
    }

    if (line == 'category') {
      const query = supabase
        .from('EventCategories')
        .update({
          EventCategoryName: name,
          EventCategoryStatus: status,
        })
        .eq('EventCategoryID', id)
        .select()
        
      const TypeEvents: DbResult<typeof query> = await query
    
      res.status(201).json({ message: 'Event type registered successfully', status: TypeEvents.error });
    }

  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
