import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
  const { id, outletId, roomName, roomSize, roomCapacity, roomVIP } = req.body;

  try {
    const tenantId = req.tenantId; 
    if (!tenantId || tenantId === null) {
      return res.status(401).json({ error: 'Invalid tenantid' });
    }
      
    const { data, error } = await supabase
    .from('Room')
    .update({
      outletId: outletId, 
      name: roomName, 
      size: roomSize, 
      capacity: roomCapacity, 
      vip: roomVIP, 
    })
    .eq('id', id)
    .eq('tenantId', tenantId)
    .select()
    
    if (error) {
      return res.status(500).json({ error: 'update room error',data });
    }

    res.status(200).json({ message: 'room updated successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
