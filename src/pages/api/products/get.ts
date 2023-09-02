import { NextApiRequest, NextApiResponse } from 'next';

import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {

    const productsQuery = supabase
      .from('Products')
      .select('*')
      .eq('tenantId', `${req.tenantId}`);
  
    // Perform the second query to get product categories
    const categoriesQuery = supabase
      .from('ProductCategories')
      .select('*');
    
    // Wait for both queries to complete
    const [productsResult, categoriesResult] = await Promise.all([productsQuery, categoriesQuery]);
    
    // Combine the results
    const products = productsResult.data;
    const categories = categoriesResult.data;
    
    // Assuming there's a categoryId column in Products
    // You can now combine the data as needed in your application
    const combinedData = products?.map((product) => {
      const category = categories?.find((category) => category.id === product.categoryId);
      return {
        ...product,
        categoryName: category ? category.categoryName : null,
      };
    });

    combinedData?.sort((a, b) => {
      const statusA = a.status as boolean;
      const statusB = b.status as boolean;
    
      return statusA === statusB ? 0 : statusA ? -1 : 1;
    });
    
  
    res.status(200).json({ data: combinedData });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
