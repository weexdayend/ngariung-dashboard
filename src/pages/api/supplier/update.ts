import { NextApiRequest, NextApiResponse } from 'next';

import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  UserID?: string;
  BusinessID?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const {
    id,
    supplierName,
    supplierPhone,
    supplierEmail,
  } = req.body

  try {

    const query = supabase
      .from('Suppliers')
      .update({
        SupplierName: supplierName,
        SupplierPhone: supplierPhone,
        SupplierEmail: supplierEmail,
        BusinessiD: req.BusinessID
      }).eq("SupplierID", id)
      .select()
    const TypeEvents: DbResult<typeof query> = await query
  
    res.status(201).json({ message: 'Supplier updated successfully', status: TypeEvents.status });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
