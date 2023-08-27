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
    outletName, 
    outletLine,
    outletAddress, 
    outletProvince,
    outletCity,
    outletZip, 
  } = req.body;

  try {
    const userId = req.userId;
    const tenantId = req.tenantId;

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const users = db.collection('Users');
    const outlet = db.collection('BusinessOutlet');

    const business = await users.findOne({ _id: new ObjectId(userId), tenantId: new ObjectId(tenantId) });

    if (!business) {
      return res.status(200).json({ message: 'Business not found' });
    }

    // Check if the data is already registered
    const existingName = await outlet.findOne({ outletName });
    if (existingName) {
      return res.status(400).json({ error: 'Name already registered' });
    }

    // Create a new user document
    const newOutlet = {
      businessId: tenantId,
      outletName, 
      outletLine,
      outletAddress, 
      outletProvince,
      outletCity,
      outletZip, 
      status: false
    };
    await outlet.insertOne(newOutlet);

    res.status(201).json({ message: 'Outlet registered successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
