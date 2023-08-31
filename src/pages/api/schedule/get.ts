import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {

  try {
    const client = await connectDB();

    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }

    const tenantId = req.tenantId;
    const db = client.db('sakapulse')
    const collection = db.collection('Schedule');
  
    const fitnessData = await collection.find(
      { 
        tenantId: new ObjectId(tenantId),
      },
    ).toArray();

    const formattedDataArray = fitnessData.map((dataItem: any) => {
      const {
        _id,
        date,
        outlet,
        tenantId,
        schedule,
      } = dataItem;
    
      return {
        _id,
        date,
        outlet,
        tenantId,
        schedule,
      };
    });
  
    res.status(200).json({ data: formattedDataArray });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default authMiddleware(handler);
