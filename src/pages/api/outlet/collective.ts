import { NextApiRequest, NextApiResponse } from 'next';
import supabase, { DbResult } from '@/db/supabase'; 
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const tenantId = req.tenantId;
    if (!tenantId || tenantId === null) {
      return res.status(401).json({ error: 'Invalid tenantId' });
    }
    
    const { data: outletData, error } = await supabase
      .from('Outlet')
      .select('id, name, employee(id, name, phone, email, role), room(id, name, size, vip, capacity, status)')
      .eq('tenantId', tenantId);

    if (error) {
      return res.status(500).json({ error: 'Error fetching outlet data' });
    }

    if (!outletData || outletData.length === 0) {
      // Handle the case where no data is found
      return res.status(200).json({ data: [{ id: null, name: null }] });
    }

    const formatted = outletData.map((dataItem) => {
      const { id, name, employee, room } = dataItem;
      
      const normalizeEmployee = employee.map((employee) => ({
        _id: employee.id,
        name: employee.name,
        size: employee.size,
        vip: employee.vip,
        capacity: employee.capacity,
        status: employee.status,
      }));
      
      const normalizeRoom = rooms.map((room) => ({
        _id: room._id,
        name: room.roomName,
      }));
      
      return {
        id,
        name: outletName,
        employees: normalizeEmployee,
        rooms: normalizeRoom,
      };
    });
    
    return res.status(200).json({ data: formatted })
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

export default handler;
