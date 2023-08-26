import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const SECRET = process.env.KEY_PASS

async function getBusinessData(userId: any) {
  const client = await connectDB();
  const db = client.db('sakapulse');
  const collection = db.collection('Users');

  const businessData = await collection.findOne({ _id: new ObjectId(userId) });
  return businessData;
}

async function getOutletData(businessId: any) {
  const client = await connectDB();
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const cookies = req.headers.authorization
  const token = cookies;

  if (!token || !SECRET) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify the token
    const decodedToken = verify(token, SECRET) as JwtPayload;
    const userId = decodedToken.userId;

    const userData = await getBusinessData(userId);
    const outletData = await getOutletData(userData?.tenantId)

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
  }
};

export default handler;
