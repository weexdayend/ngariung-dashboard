import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/db/supabase';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const tenantId = req.tenantId;
    if (!tenantId || tenantId === null) {
      return res.status(401).json({ error: 'Invalid tenantId' });
    }

    // Mengambil data dari tabel Employee dan menyertakan data terkait dari tabel User dan Outlet
    const { data: employeeData, error } = await supabase
      .from('Employee')
      .select('id, name, phone, email, Users:Users(role), Outlet:Outlet(name)')
      .eq('tenantId', tenantId);

    if (error) {
      return res.status(401).json({ error: 'Error fetching employee data' });
    }

    // Variabel data sekarang berisi kolom yang diinginkan dari tabel yang terkait
    res.status(200).json({ data: employeeData });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
