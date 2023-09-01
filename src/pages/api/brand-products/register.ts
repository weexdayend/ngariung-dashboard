import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';
 
interface AuthenticatedRequest extends NextApiRequest {
    userId?: string;
    tenantId?: string;
  }

const isAlreadyRegistered = async (field: any, value: any) => {
  const query = supabase.from('BrandProducts').select().eq(field, value);
  const TypeEvents: DbResult<typeof query> = await query;

  return TypeEvents;
};

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    } 

  const { 
    brandName,  
  } = req.body;

  try {
  
    let message;
 
    const checkName = await isAlreadyRegistered('brandName', brandName);
    if (checkName.data?.length ?? 0 > 0) {
      message = 'Brand product already registered';
      return res.status(201).json({ message: message });  
    }
    
    const query = supabase
      .from('BrandProducts')
      .insert({
        brandName: brandName, 
        tenantId: req.tenantId, 
        status: false,
      })
      .select()
    const Brand: DbResult<typeof query> = await query;

    if (Brand.error) {
      return res.status(500).json({ error: 'Brand product registering failed' });
    } 
    
    res.status(201).json({ message: 'Brand product successfully'});
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
