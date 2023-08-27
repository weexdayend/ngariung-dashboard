import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

async function getEmployeeData(tenantId: any) {
  const client = await connectDB();
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

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const tenantId = req.tenantId;

    const employeeData = await getEmployeeData(tenantId);

    if (!employeeData) {
      return res.status(200).json({
        data: [
          {
            _id: null,
            employeeName: null,
            employeePhone: null,
            employeeEmail: null,
            employeeRole: null,
            status: null,
          },
        ],
      });
    }

    const formattedDataArray = employeeData.map((dataItem) => {
      const {
        _id,
        employeeName,
        employeePhone,
        employeeEmail,
        employeeRole,
        status,
        outletName, // Add this line
      } = dataItem;
    
      return {
        _id,
        employeeName,
        employeePhone,
        employeeEmail,
        employeeRole,
        status,
        outletName, // Add this line
      };
    });
  
    res.status(200).json({ data: formattedDataArray });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
