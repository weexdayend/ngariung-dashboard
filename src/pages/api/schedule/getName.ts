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

  try {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }

    const tenantId = req.tenantId;
    
    const db = client.db('sakapulse');
    const collection = db.collection('Schedule');
  
    const fitnessData = await collection.find(
      { 
        tenantId: new ObjectId(tenantId),
      },
    ).toArray();

    const uniqueEventNames = fitnessData.reduce((result: any, dataItem: any) => {
      const eventName = dataItem.schedule[0].eventName;
      result[eventName] = true; // Use eventName as the key and set value to true
      return result;
    }, {});
    
    const uniqueEventNamesArray = Object.keys(uniqueEventNames).map((eventName, id) => ({
      id,
      name: eventName,
    }));

    res.status(200).json({ data: uniqueEventNamesArray });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  } finally {
    client.close()
  }
};

export default authMiddleware(handler);
