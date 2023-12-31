import { NextApiRequest, NextApiResponse } from 'next'; 
import supabase, { DbResult } from '@/db/supabase'; 
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
  if (req.method !== 'GET') {
    return res.status(405).end();  
  }

  try {
    const { tenantId } = req;

    const getProductCategoriesData = async (tenantId: any) => {
 
      const query = supabase.from('ProductCategories').select('id, categoryName, Products:Products(productName)').eq("tenantId", tenantId);
      const ProductCategories: DbResult<typeof query> = await query;
      
      if (!ProductCategories || ProductCategories.data === null) {
        return res.status(401).json({ error: 'Invalid product categories' });
      }  
      return ProductCategories;
    }

    const ProductCategories = await getProductCategoriesData(tenantId);

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
