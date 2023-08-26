import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const SECRET = process.env.KEY_PASS

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

export default handler;
