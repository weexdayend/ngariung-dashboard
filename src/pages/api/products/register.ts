import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';
 
interface AuthenticatedRequest extends NextApiRequest {
    userId?: string;
    tenantId?: string;
  }

const isAlreadyRegistered = async (field: any, value: any) => {
  const query = supabase.from('Products').select().eq(field, value);
  const TypeEvents: DbResult<typeof query> = await query;

  return TypeEvents;
};

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    } 

  const { 
    categoryId,  
    productName,  
    brandId,    
  } = req.body;

  try {
     
    let message;
 
    const checkName = await isAlreadyRegistered('productName', productName);
    if (checkName.data?.length ?? 0 > 0) {
      message = 'Product already registered';
      return res.status(201).json({ message: message });  
    }
    
    const query = supabase
      .from('Products')
      .insert({
        categoryId: categoryId, 
        productName: productName, 
        brandId: brandId, 
        tenantId: req.tenantId,  
        status: false,
      })
      .select()
    const Products: DbResult<typeof query> = await query;

    if (Products.error) {
      return res.status(500).json({ error: 'Product registering failed' });
    } 
    
    res.status(201).json({ message: 'Product successfully'  });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
