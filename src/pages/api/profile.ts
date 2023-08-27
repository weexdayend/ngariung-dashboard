import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
  userRole?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const userId = req.userId;

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const collection = db.collection('Users');

    // Fetch profile data based on userId
    const profileData = await collection.findOne({ _id: new ObjectId(userId) });

    if (!profileData) {
      return res.status(404).json({ error: userId });
    }

    res.status(200).json({ name: profileData.fullName, email: profileData.email });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
