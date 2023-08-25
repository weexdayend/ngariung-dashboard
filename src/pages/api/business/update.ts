import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';

import { JwtPayload, verify } from 'jsonwebtoken';
import cookie from 'cookie';
import getConfig from 'next/config';
import { ObjectId } from 'mongodb';
const { publicRuntimeConfig } = getConfig();

const SECRET = publicRuntimeConfig.KEYPASS;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;
  const refreshToken = cookies.refreshToken;

  if (!token || !refreshToken || !SECRET) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { businessName, businessPhone, businessEmail } = req.body;

  try {
    // Verify the token
    const decodedToken = verify(token, SECRET) as JwtPayload;
    const userId = decodedToken.userId;
    const userObjectId = new ObjectId(userId);

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const userCollection = db.collection('Users');
    const businessCollection = db.collection('Business');

    const profileData = await userCollection.findOne({ _id: userObjectId });

    // Update the existing business document
    const updateResult = await businessCollection.updateOne(
      { _id: profileData?.tenantId },
      { $set: { businessName, businessPhone, businessEmail } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ error: 'Business not found' });
    }

    res.status(200).json({ message: 'Business updated successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
