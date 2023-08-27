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

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }

    const tenantId = req.tenantId;
    const fitnessData = await getOutletData(tenantId)

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

export default authMiddleware(handler);
