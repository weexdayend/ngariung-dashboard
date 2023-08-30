import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

const SECRET = process.env.KEY_PASS || '';
const DOMAIN = process.env.DOMAIN;

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  userRole?: string;
}

async function isAlreadyRegistered(collection: any, field: string, value: string) {
  return await collection.findOne({ [field]: value }) !== null;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const client = await connectDB();

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

    const db = client.db('sakapulse');
    const businessCollection = db.collection('Business');

    if (await isAlreadyRegistered(businessCollection, 'businessName', businessName)) {
      return res.status(400).json({ error: 'Name already registered' });
    }
    if (await isAlreadyRegistered(businessCollection, 'businessEmail', businessEmail)) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    if (await isAlreadyRegistered(businessCollection, 'businessPhone', businessPhone)) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    const newBusiness = {
      businessName,
      businessPhone,
      businessEmail,
      status: true
    };
    const tenant = await businessCollection.insertOne(newBusiness);

    if (!tenant.acknowledged) {
      return res.status(400).json({ error: 'Business registration failed' });
    }

    const update = await db.collection('Users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { tenantId: tenant.insertedId } }
    );

    if (update.modifiedCount === 0) {
      return res.status(400).json({ error: 'User data update failed' });
    }

    const token = jwt.sign(
      { userId, userRole: req.userRole, tenantId: tenant.insertedId },
      SECRET,
      { expiresIn: '1h' }
    );

    res.setHeader('Set-Cookie', [
      serialize('token', token, {
        httpOnly: false,
        secure: true,
        domain: DOMAIN,
        path: '/',
        maxAge: 60 * 60,
        sameSite: "strict"
      }),
      serialize('refreshToken', token, {
        httpOnly: false,
        secure: true,
        domain: DOMAIN,
        path: '/',
        maxAge: 60 * 60,
        sameSite: "strict"
      })
    ]);

    res.status(201).json({ message: 'User data updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
