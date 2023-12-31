import { NextApiRequest, NextApiResponse } from 'next';
import supabase, { DbResult } from '@/db/supabase'; 
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
  const { businessName, businessPhone, businessEmail } = req.body;

  try {
    const tenantId = req.tenantId; 
    if (!tenantId || tenantId === null) {
      return res.status(401).json({ error: 'Invalid tenantid' });
    }
     

    const { data, error } = await supabase
    .from('Business')
    .update({ name: businessName,phone:businessPhone,email:businessEmail })
    .eq('id', tenantId)
    .select()
    
    if (error) {
      return res.status(500).json({ error: 'update business error' });
    }

    res.status(200).json({ message: 'Business updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
