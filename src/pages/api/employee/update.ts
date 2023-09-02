import { NextApiRequest, NextApiResponse } from 'next'; 
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
  const { id, outletId, employeeName, employeePhone, employeeEmail, employeeRole } = req.body; 
  try {
    const tenantId = req.tenantId; 
    if (!tenantId || tenantId === null) {
      return res.status(401).json({ error: 'Invalid tenantid' });
    }
      
    const { data, error } = await supabase
    .from('Employee')
    .update({
      name: employeeName, 
      phone: employeePhone, 
      email: employeeEmail, 
      role: employeeRole,  
      outletId: outletId   
    })
    .eq('id', id)
    .eq('tenantId', tenantId)
    .select()
    
    if (error) {
      return res.status(500).json({ error: 'update Employee error',data });
    } 
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
