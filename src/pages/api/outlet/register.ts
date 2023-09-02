import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
  collectionId?: string;
}
const isAlreadyRegistered = async (field: any, value: any) => {
  const query = supabase.from('Outlet').select().eq(field, value);
  const Outlet: DbResult<typeof query> = await query;

  return Outlet;
}; 
const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {  
  if (req.method !== 'POST') { return res.status(405).end(); } // Method Not Allowed

  const { 
    outletName, 
    outletLine,
    outletAddress, 
    outletProvince,
    outletCity,
    outletZip, 
  } = req.body;

  try {
    const userId = req.userId;
    const tenantId = req.tenantId;
    let message
    if (!tenantId || tenantId === null) {
        return res.status(401).json({ error: 'Invalid tenantId' });
    }
    if (!userId || userId === null) {
        return res.status(401).json({ error: 'Invalid userId' });
    }
 
    const checkoutletName = await isAlreadyRegistered('name', outletName);
    if (checkoutletName.data?.length ?? 0 > 0) {
      message = 'Outlet name registered';
      return res.status(201).json({ message: message });  
    }
 
    const query = supabase
      .from('Outlet')
      .insert({
        name: outletName, 
        line: outletLine, 
        address: outletAddress, 
        province: outletProvince, 
        city: outletCity, 
        postal: outletZip, 
        status: false, 
        tenantId: req.tenantId   
      })
      .select()
    const Outlet: DbResult<typeof query> = await query;

    if (Outlet.error) {
      return res.status(500).json({ error: 'Outlet registering failed' });
    } 
    
    res.status(201).json({ message: 'Outlet successfully'  });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
