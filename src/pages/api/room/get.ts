import { NextApiRequest, NextApiResponse } from 'next'; 
import supabase, { DbResult } from '@/db/supabase'; 
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
  collectionId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => { 

  if (req.method !== 'GET') { return res.status(405).end(); }

  try {

    const tenantId = req.tenantId;
    if (!tenantId || tenantId === null) {
        return res.status(401).json({ error: 'Invalid tenantId' });
    }

    const getRoomData = async (tenantId: any) => { 
      const query = supabase.from('Room').select("*").eq("tenantId", tenantId);
      const Outlet: DbResult<typeof query> = await query;
      
      if (!Outlet || Outlet.data === null) {
        return res.status(401).json({ error: 'Invalid business' });
      } 
    
      return Outlet;
    }

    const roomData = await getRoomData(tenantId)

    if (!roomData) { 
      return res.status(200).json({
        id: null, 
        outletId: null, 
        name: null, 
        size: null, 
        capacity: null, 
        vip: null, 
      }); 
    }
 
    const { data } = roomData;
    res.status(200).json({ data: data });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
