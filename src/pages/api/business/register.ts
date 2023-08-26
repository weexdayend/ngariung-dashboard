import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';

import { JwtPayload, verify } from 'jsonwebtoken'; // Import verify from jsonwebtoken library
import cookie from 'cookie';
import { ObjectId } from 'mongodb';

const SECRET = process.env.KEY_PASS

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const cookies = cookie.parse(req.headers.cookie || '')

  const token = cookies.token
  const refreshToken = cookies.refreshToken

  if (!token || !refreshToken || !SECRET) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { 
    businessName, 
    businessPhone, 
    businessEmail 
  } = req.body;

  try {
    // Verify the token
    const decodedToken = verify(token, SECRET) as JwtPayload; // Replace with your secret key

    // You can access the decoded token payload to get user information
    const userId = decodedToken.userId;
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
