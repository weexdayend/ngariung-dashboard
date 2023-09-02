import { NextApiRequest, NextApiResponse } from 'next';
import supabase, { DbResult } from '@/db/supabase'; 
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
  const { productPhoto,categoryId,brandId, id } = req.body; 
  try {
    const tenantId = req.tenantId; 
    if (!tenantId || tenantId === null) {
      return res.status(401).json({ error: 'Invalid tenantid' });
    }
      
    const { data, error } = await supabase
    .from('Products')
    .update({ productPhoto: productPhoto, categoryId:categoryId,brandId :brandId})
    .eq('id', id)
    .eq('tenantId', tenantId)
    .select()
    
    if (error) {
      return res.status(500).json({ error: 'update product error' });
    }

    res.status(200).json({ message: 'update product successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
