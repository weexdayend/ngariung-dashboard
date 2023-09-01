import { NextApiRequest, NextApiResponse } from 'next'; 
import supabase, { DbResult } from '@/db/supabase'; 
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { tenantId } = req;

    const getBusinessData = async (tenantId: any) => {
 
      const query = supabase.from('BrandProducts').select().eq("tenantId", tenantId);
      const BrandProducts: DbResult<typeof query> = await query;
      
      if (!BrandProducts || BrandProducts.data === null) {
        return res.status(401).json({ error: 'Invalid business' });
      }
      const result = BrandProducts.data[0]; 
    
      return BrandProducts;
    }

    const BrandProducts = await getBusinessData(tenantId);

    if (!BrandProducts) {
      return res.status(200).json({ brandName: null });
    }

    const { data } = BrandProducts;

    res.status(200).json({ id:data[0].id, brandName:data[0].brandName });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
