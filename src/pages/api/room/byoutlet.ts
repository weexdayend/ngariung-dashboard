import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

async function getEmployeeData(userId: any, outletId: any, ) {
  const client = await connectDB();
  const db = client.db('sakapulse');
  const rooms = db.collection('BusinessRoom');
  const collection = db.collection('BusinessOutlet');

  const room = await rooms.findOne({
    _id: new ObjectId(userId),
  });

  const employeeData = await collection.find({ 
    tenantId: room?.tenantId,
  }).toArray();

  return employeeData;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const userId = req.userId;

    const { outlet } = req.query;

    const employeeData = await getEmployeeData(userId, outlet);

    if (!employeeData) {
      return res.status(200).json({
        data: [
          {
            _id: null,
            employeeName: null,
            assignedOutletId: null,
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
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
