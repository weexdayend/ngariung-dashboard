import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/db/supabase';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
  collectionId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const tenantId = req.collectionId;

    const getEmployeeData = async (tenantId: any) => {
      const db = client.db('sakapulse');
      const collection = db.collection('BusinessEmployee');
      const outletCollection = db.collection('BusinessOutlet'); // Add this line
    
      const employeeData = await collection.find({ tenantId: new ObjectId(tenantId) }).toArray();
    
      // Fetch outlet information for each employee
      const employeesWithOutletData = await Promise.all(
        employeeData.map(async (employee) => {
          if (employee.assignedOutletId) {
            const outlet = await outletCollection.findOne({
              _id: new ObjectId(employee.assignedOutletId),
            });
            return { ...employee, outletName: outlet?.outletName };
          }
          return employee;
        })
      );
    
      return employeesWithOutletData;
    }
 
    const { data: employeeData, error } = await supabase
      .from('Employee')
      .select('id, name, phone, email, Users:Users(role), Outlet:Outlet(name)')
      .eq('tenantId', tenantId);

    if (error) {
      return res.status(401).json({ error: 'Error fetching employee data' });
    }
 
    res.status(200).json({ data: employeeData });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
