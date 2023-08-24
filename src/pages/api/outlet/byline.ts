import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const SECRET = publicRuntimeConfig.KEYPASS

async function getBusinessData(userId: any) {
  const client = await connectDB();
  const db = client.db('sakapulse');
  const collection = db.collection('Users');

  const businessData = await collection.findOne({ _id: new ObjectId(userId) });
  return businessData;
}

async function getOutletData(businessId: any, outletLine: any) {
  const client = await connectDB();
  const db = client.db('sakapulse');
  const collection = db.collection('BusinessOutlet');

  const outletData = await collection.find({
    businessId: new ObjectId(businessId),
    'outletLine.name': outletLine,
  }).toArray();
  return outletData;
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

    const { line } = req.query;

    const userData = await getBusinessData(userId);
    const outletData = await getOutletData(userData?.tenantId, line)

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
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
