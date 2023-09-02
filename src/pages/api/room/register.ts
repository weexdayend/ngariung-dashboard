import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}
const isAlreadyRegistered = async (field: any, value: any) => {
  const query = supabase.from('Room').select().eq(field, value);
  const Room: DbResult<typeof query> = await query;

  return Room;
};
const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { 
    outletId,
    roomName, 
    roomSize, 
    roomVIP,
    roomCapacity, 
  } = req.body;

  try {
    const tenantId = req.tenantId; 
    let message
    if (!tenantId || tenantId === null) {
      return res.status(401).json({ error: 'Invalid tenantId' });
    } 

    const checkroomName = await isAlreadyRegistered('name', roomName);
    if (checkroomName.data?.length ?? 0 > 0) {
      message = 'Room name registered';
      return res.status(201).json({ message: message });  
    }
  
    const query = supabase
    .from('Room')
    .insert({
      outletId: outletId, 
      name: roomName, 
      size: roomSize, 
      vip: roomVIP, 
      capacity: roomCapacity,  
      status: false, 
      tenantId: req.tenantId   
    })
    .select()
  const Room: DbResult<typeof query> = await query;

  if (Room.error) {
    return res.status(500).json({ error: 'Room registering failed', data:Room });
  } 
  
  res.status(201).json({ message: 'Room successfully'  });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
}; 
export default authMiddleware(handler);
