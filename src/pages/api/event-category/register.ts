import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const {
    nameCategory,
  } = req.body

  try {

    const query = supabase
      .from('EventCategory')
      .insert({
        nameCategory: nameCategory,
        tenantId: req.tenantId,
        status: false,
      })
      .select()
    const TypeEvents: DbResult<typeof query> = await query
  
    res.status(201).json({ message: 'Event category registered successfully', status: TypeEvents.status });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
