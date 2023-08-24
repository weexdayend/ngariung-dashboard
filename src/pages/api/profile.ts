import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';

import { JwtPayload, verify } from 'jsonwebtoken'; // Import verify from jsonwebtoken library

import cookie from 'cookie';

import getConfig from 'next/config';
import { ObjectId } from 'mongodb';
const { publicRuntimeConfig } = getConfig();

const SECRET = publicRuntimeConfig.KEYPASS

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const cookies = cookie.parse(req.headers.cookie || '')

  const token = cookies.token
  const refreshToken = cookies.refreshToken

  if (!token || !refreshToken) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify the token
    const decodedToken = verify(token, SECRET) as JwtPayload; // Replace with your secret key

    // You can access the decoded token payload to get user information
    const userId = decodedToken.userId;

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

export default handler;
