import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

async function getOutletData(businessId: any) {
  const client = await connectDB();
  const db = client.db('sakapulse');
  const collection = db.collection('BusinessOutlet');

  const outletData = await collection.find({
    businessId: new ObjectId(businessId),
  }).toArray();
  return outletData;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const tenantId = req.tenantId;
    const outletData = await getOutletData(tenantId)

    if (!outletData) {
      return res.status(200).json({
        data: [
          {
            id: null,
            name: null,
          },
        ],
      });
    }

    const formattedDataArray = outletData.map((dataItem) => {
      const {
        _id,
        outletName,
        employees,
        rooms,
      } = dataItem;

      const normalizeEmployee = employees.map((employee: any) => ({
        _id: employee._id,
        name: employee.employeeName,
        role: employee.employeeRole,
        phone: employee.employeePhone,
      }))

      const normalizeRoom = rooms.map((room: any) => ({
        _id: room._id,
        name: room.roomName
      }))
  
      return {
        id: _id,
        name: outletName,
        employees: normalizeEmployee,
        rooms: normalizeRoom,
      };
    });
  
    res.status(200).json({ data: formattedDataArray });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
