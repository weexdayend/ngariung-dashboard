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
      const productsQuery = supabase
        .from('ProductCategories')
        .select('*')
        .eq('tenantId', `${tenantId}`);
      const ProductCategories: DbResult<typeof productsQuery> = await productsQuery;
    
      return ProductCategories;
    }

    const ProductCategories = await getBusinessData(tenantId);

    if (!ProductCategories) {
      return res.status(200).json({ categoryName: null });
    }

    const { data } = ProductCategories;

    res.status(200).json({ data: data });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
