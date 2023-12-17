import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  UserID?: string;
  BusinessID?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {

  const { VenueID, VenueName, VenueSize, VenueCapacity, VenueStatus } = req.body;

  try {
    const BusinessID = req.BusinessID; 
    if (!BusinessID || BusinessID === null) {
      return res.status(401).json({ error: 'Invalid BusinessID' });
    }
      
    const { error } = await supabase
    .from('Venues')
    .update({
      VenueName, 
      VenueSize,
      VenueCapacity,
      VenueStatus,
    })
    .eq('VenueID', VenueID)
    .eq('BusinessID', BusinessID)
    .select()
    
    if (error) {
      return res.status(500).json({ error: 'Venue updated error' });
    } 
    res.status(200).json({ message: 'Venue updated successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
