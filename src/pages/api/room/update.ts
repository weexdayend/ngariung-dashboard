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

  const { _id, roomName, roomSize, roomCapacity, roomVIP, status } = req.body;

  try {
    const outletId = new ObjectId(_id);

    // Connect to the MongoDB database
    const db = client.db('sakapulse');
    const collection = db.collection('BusinessRoom');

    // Update the existing business document
    const updateResult = await collection.updateOne(
      { _id: outletId },
      { $set: { roomName, roomSize, roomCapacity, roomVIP, status } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json({ message: 'Room updated successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
