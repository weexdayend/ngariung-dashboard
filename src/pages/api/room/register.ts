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
    roomName, 
    roomSize, 
    roomVIP,
    roomCapacity, 
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
    const collection = db.collection('BusinessRoom');
    const users = db.collection('Users')

    const user = await users.findOne({ _id: userObjectId })

    // Create a new user document
    const newBusiness = {
      roomName,
      roomSize,
      roomVIP,
      roomCapacity,
      status: false,
      tenantId: user?.tenantId
    };
    await collection.insertOne(newBusiness);

    res.status(201).json({ message: 'Room registered successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
