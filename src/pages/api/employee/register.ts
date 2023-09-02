import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';
import bcrypt from 'bcrypt';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
  collectionId?: string;
}
const isAlreadyRegistered = async (field: any, value: any) => {
  const query = supabase.from('Employee').select().eq(field, value);
  const Room: DbResult<typeof query> = await query;

  return Room;
};
const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { 
    outletId, 
    employeeName, 
    employeePhone, 
    employeeEmail,
    employeeRole, 
  } = req.body;

  try {
    const tenantId = req.tenantId; 
    let message
    if (!tenantId || tenantId === null) {
      return res.status(401).json({ error: 'Invalid tenantId' });
    } 
 
    // Connect to the MongoDB database 
    const checkPhone = await isAlreadyRegistered('phone', employeePhone);
    if (checkPhone.data?.length ?? 0 > 0) {
      message = 'Phone registered';
      return res.status(201).json({ message: message });  
    }
    const checkEmail = await isAlreadyRegistered('email', employeeEmail);
    if (checkEmail.data?.length ?? 0 > 0) {
      message = 'Email registered';
      return res.status(201).json({ message: message });  
    }
     
  
    const hashedPassword = await bcrypt.hash('$akaPulse135', 10);
  
    const queryuser = supabase
      .from('Users')
      .insert({
        name: employeeName,
        phone: employeePhone,
        email: employeeEmail,
        password: hashedPassword,
        role: employeeRole.name,
        tenantId: tenantId,
        status: false
      })
      .select()
    const Users: DbResult<typeof queryuser> = await queryuser;
    
    if (Users.error) {
      return res.status(500).json({ error: 'Users registering failed' });
    }
    // Create a new user document 
    const query = supabase
    .from('Employee')
    .insert({
      name: employeeName, 
      phone: employeePhone, 
      email: employeeEmail, 
      role: employeeRole, 
      userId: Users.data[0].id,  
      outletId: outletId, 
      tenantId: req.tenantId,   
      status: false   
    })
    .select()
    const Employee: DbResult<typeof query> = await query;

    if (Employee.error) {
      return res.status(500).json({ error: 'Room registering failed', data:Employee });
    } 
  
    res.status(201).json({ message: 'Employee registered successfully'  });
 
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' + error });
  }
};

export default authMiddleware(handler);
