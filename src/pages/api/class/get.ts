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
  const collection = db.collection('FitnessClass');
  const outletCollection = db.collection('BusinessOutlet');

  const fitnessData = await collection.find(
    { 
      tenantId: new ObjectId(businessId),
    },
  ).toArray();

  const fitnessWithOutletData = await Promise.all(
    fitnessData.map(async (fitness) => {
      if (fitness.outletId) {
        const outletData = await outletCollection.findOne({
          _id: new ObjectId(fitness.outletId),
        });
        return { ...fitness, outletName: outletData?.outletName };
      }
      return fitness;
    })
  );

  return fitnessWithOutletData;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const cookies = req.headers.authorization
    const token = cookies;
  
    if (!token || !SECRET) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Verify the token
    const decodedToken = verify(token, SECRET) as JwtPayload;
    const userId = decodedToken.userId;

    const userData = await getBusinessData(userId);
    const fitnessData = await getOutletData(userData?.tenantId)

    const formattedDataArray = fitnessData.map((dataItem) => {
      const {
        _id,
        date,
        outletId,
        tenantId,
        schedule,
        outletName, // Add this line
      } = dataItem;
    
      return {
        _id,
        date,
        outletId,
        tenantId,
        schedule,
        outletName, // Add this line
      };
    });
  
    res.status(200).json({ data: formattedDataArray });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
