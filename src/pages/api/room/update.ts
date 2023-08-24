import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';

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

  const { _id, roomName, roomSize, roomCapacity, roomVIP, status } = req.body;

  try {
    const outletId = new ObjectId(_id);

    // Connect to the MongoDB database
    const client = await connectDB();
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

export default handler;
