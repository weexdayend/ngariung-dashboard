import { NextApiRequest, NextApiResponse } from 'next'; 
import supabase, { DbResult } from '@/db/supabase'; 
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  UserID?: string;
  BusinessID?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => { 

  if (req.method !== 'GET') { return res.status(405).end(); }

  try {

    const tenantId = req.BusinessID;
    if (!tenantId || tenantId === null) {
        return res.status(401).json({ error: 'Invalid tenantId' });
    }

    const getRoomData = async (tenantId: any) => { 
      const query = supabase.from('Venues').select("*").eq("BusinessID", tenantId);
      const Outlet: DbResult<typeof query> = await query;
      
      if (!Outlet || Outlet.data === null) {
        return res.status(401).json({ error: 'Invalid business' });
      } 
    
      return Outlet;
    }

    const roomData = await getRoomData(tenantId)

    if (!roomData) { 
      return res.status(200).json({
        data: []
      }); 
    } 
    const { data } = roomData;
    res.status(200).json({ data: data });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
