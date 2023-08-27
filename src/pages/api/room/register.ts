import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { 
    roomName, 
    roomSize, 
    roomVIP,
    roomCapacity, 
  } = req.body;

  try {
    const tenantId = req.tenantId;

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const collection = db.collection('BusinessRoom');

    // Create a new user document
    const newBusiness = {
      roomName,
      roomSize,
      roomVIP,
      roomCapacity,
      status: false,
      tenantId: new ObjectId(tenantId)
    };
    await collection.insertOne(newBusiness);

    res.status(201).json({ message: 'Room registered successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
