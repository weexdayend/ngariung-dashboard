import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const client = await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const userId = req.userId;
    const { outlet, role } = req.query;

    const getEmployeeData = async (userId: any, outletId: any, role: any) => {
      const db = client.db('sakapulse');
      const users = db.collection('Users');
      const collection = db.collection('BusinessEmployee');

      const user = await users.findOne({
        _id: new ObjectId(userId),
      });

      const employeeData = await collection.find({ 
        tenantId: user?.tenantId,
        'employeeRole.name': role,
        assignedOutletId: new ObjectId(outletId) 
      }).toArray();

      return employeeData;
    }


    const employeeData = await getEmployeeData(userId, outlet, role);

    if (!employeeData || employeeData.length === 0) {
      return res.status(200).json({
        data: [
          {
            id: null,
            name: null,
          },
        ],
      });
    }

    const formattedDataArray = employeeData.map((dataItem) => {
      const {
        _id,
        employeeName,
      } = dataItem;
    
      return {
        id: _id,
        name: employeeName,
      };
    });
  
    res.status(200).json({ data: formattedDataArray });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  } finally {
    client.close()
  }
};

export default authMiddleware(handler);
