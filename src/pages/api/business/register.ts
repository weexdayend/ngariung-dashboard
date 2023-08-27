import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { 
    businessName, 
    businessPhone, 
    businessEmail 
  } = req.body;

  try {
    const userId = req.userId;
    const userObjectId = new ObjectId(userId);

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const collection = db.collection('Business');

    // Check if the data is already registered
    const existingName = await collection.findOne({ businessName });
    if (existingName) {
      return res.status(400).json({ error: 'Name already registered' });
    }
    const existingEmail = await collection.findOne({ businessEmail });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const existingNumber = await collection.findOne({ businessPhone });
    if (existingNumber) {
      return res.status(400).json({ error: 'Phone number already registered'})
    }

    // Create a new user document
    const newBusiness = {
      businessName,
      businessPhone,
      businessEmail,
      status: true
    };
    const tenant = await collection.insertOne(newBusiness);

    await db.collection('Users').updateOne(
      { _id: userObjectId },
      { $set: { tenantId: tenant.insertedId } }
    );

    res.status(201).json({ message: 'Business registered successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
