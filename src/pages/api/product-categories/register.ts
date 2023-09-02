import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';
 
interface AuthenticatedRequest extends NextApiRequest {
    userId?: string;
    tenantId?: string;
  }

const isAlreadyRegistered = async (field: any, value: any, tenantId: any) => {
  const query = supabase.from('ProductCategories').select().eq(field, value).eq('tenantId', tenantId);
  const TypeEvents: DbResult<typeof query> = await query;

  return TypeEvents;
};

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    } 

  const { 
    categoryName,  
  } = req.body;

  try {
     
    let message;
 
    const checkName = await isAlreadyRegistered('categoryName', categoryName, req.tenantId);
    if (checkName.data?.length ?? 0 > 0) {
      message = 'Product category already registered';
      return res.status(201).json({ message: message });  
    }
    
    const query = supabase
      .from('ProductCategories')
      .insert({
        categoryName: categoryName, 
        tenantId: req.tenantId, 
        status: false,
      })
      .select()
    const ProductCategories: DbResult<typeof query> = await query;

    if (ProductCategories.error) {
      return res.status(500).json({ error: 'Product category registering failed' });
    } 
    
    res.status(201).json({ message: 'Product category successfully' + req.tenantId });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
