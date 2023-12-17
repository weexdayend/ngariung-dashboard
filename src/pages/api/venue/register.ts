import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  UserID?: string;
  BusinessID?: string;
}
const isAlreadyRegistered = async (field: any, value: any) => {
  const query = supabase.from('Venues').select().eq(field, value);
  const Room: DbResult<typeof query> = await query;

  return Room;
};
const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const {
    VenueName, 
    VenueSize,
    VenueCapacity,
  } = req.body;

  try {
    const tenantId = req.BusinessID;
    if (!tenantId || tenantId === null) {
      return res.status(401).json({ error: 'Invalid tenantId' });
    } 
  
    const query = supabase
    .from('Venues')
    .insert({
      VenueName,
      VenueSize,
      VenueCapacity,
      VenueStatus: true,
      BusinessID: req.BusinessID   
    })
    .select()
    const Room: DbResult<typeof query> = await query;

    if (Room.error) {
      return res.status(500).json({ error: 'Room registering failed', data:Room });
    } 
    
    res.status(201).json({ message: 'Room successfully'  });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
}; 
export default authMiddleware(handler);
