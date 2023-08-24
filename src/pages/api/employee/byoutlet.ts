import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const SECRET = publicRuntimeConfig.KEYPASS

async function getEmployeeData(userId: any, outletId: any, role: any) {
  const client = await connectDB();
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

    const { outlet, role } = req.query;

    const employeeData = await getEmployeeData(userId, outlet, role);

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

export default handler;
