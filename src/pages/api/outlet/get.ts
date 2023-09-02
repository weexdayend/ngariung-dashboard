import { NextApiRequest, NextApiResponse } from 'next'; 
import supabase, { DbResult } from '@/db/supabase'; 
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => { 

  if (req.method !== 'GET') { return res.status(405).end(); }

  try {

    const tenantId = req.tenantId;
    if (!tenantId || tenantId === null) {
        return res.status(401).json({ error: 'Invalid tenantId' });
    }

    const getOutletData = async (tenantId: any) => { 
      const query = supabase.from('Outlet').select("id, name, line, address, province, city, postal, Employee:Employee(name, phone, email, Users:Users(role))").eq("tenantId", tenantId);
      const Outlet: DbResult<typeof query> = await query;
      
      if (!Outlet || Outlet.data === null) {
        return res.status(401).json({ error: 'Invalid business' });
      } 
    
      return Outlet;
    }

    const outletData = await getOutletData(tenantId)

    if (!outletData) { 
      return res.status(200).json({
        id: null,
        outletName: null,
        outletLine: null,
        outletAddress: null,
        outletProvince: null,
        outletCity: null,
        outletZip: null,
        status: null,
      }); 
    }
 
    const { data } = outletData;
    res.status(200).json({ data: data });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
