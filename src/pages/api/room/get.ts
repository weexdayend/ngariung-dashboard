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
    const tenantId = req.tenantId;

    const getOutletData = async (businessId: any) => {
      const db = client.db('sakapulse');
      const collection = db.collection('BusinessRoom');
      const outletCollection = db.collection('BusinessOutlet'); // Add this line
    
      const businessData = await collection.find(
        { 
          tenantId: new ObjectId(businessId),
        },
      ).toArray();
      
      // Fetch outlet information for each employee
      const employeesWithOutletData = await Promise.all(
        businessData.map(async (employee) => {
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
    const outletData = await getOutletData(tenantId)

    if (!outletData) {
      return res.status(200).json({
        data: [
          {
            _id: null,
            roomName: null,
            roomSize: null,
            roomVIP: null,
            roomCapacity: null,
            status: null,
            tenantId: null,
            outletName: null,
          },
        ],
      });
    }

    const formattedDataArray = outletData.map((dataItem) => {
      const {
        _id,
        roomName,
        roomSize,
        roomVIP,
        roomCapacity,
        status,
        tenantId,
        outletName,
      } = dataItem;
  
      return {
        _id,
        roomName,
        roomSize,
        roomVIP,
        roomCapacity,
        status,
        tenantId,
        outletName,
      };
    });
  
    res.status(200).json({ data: formattedDataArray });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  } finally {
    client.close()
  }
};

export default authMiddleware(handler);
