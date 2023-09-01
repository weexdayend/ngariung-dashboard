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
 
      const query = supabase.from('Products').select().eq("tenantId", tenantId);
      const Products: DbResult<typeof query> = await query;
      
      if (!Products || Products.data === null) {
        return res.status(401).json({ error: 'Invalid business' });
      }
      const result = Products.data[0]; 
    
      return Products;
    }

    const Products = await getBusinessData(tenantId);

    if (!Products) {
      return res.status(200).json({ productPhoto: null });
    }

    const { data } = Products;

    res.status(200).json({ id:data[0].id, productPhoto:data[0].productPhoto });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
