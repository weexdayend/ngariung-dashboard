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

async function getOutletData(businessId: any) {
  const client = await connectDB();
  const db = client.db('sakapulse');
  const collection = db.collection('BusinessOutlet');

  const businessData = await collection.find(
    { 
      businessId: new ObjectId(businessId),
    },
  ).toArray();
  return businessData;
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
            outletName: null,
            outletLine: null,
            outletAddress: null,
            outletProvince: null,
            outletCity: null,
            outletZip: null,
            status: null,
          },
        ],
      });
    }

    const formattedDataArray = outletData.map((dataItem) => {
      const {
        _id,
        outletName,
        outletLine,
        outletAddress,
        outletProvince,
        outletCity,
        outletZip,
        status,
      } = dataItem;
  
      return {
        _id,
        outletName,
        outletLine,
        outletAddress,
        outletProvince,
        outletCity,
        outletZip,
        status,
      };
    });
  
    res.status(200).json({ data: formattedDataArray });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
