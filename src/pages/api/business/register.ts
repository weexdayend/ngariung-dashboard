import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';
import jwt from 'jsonwebtoken';

import { serialize } from 'cookie';

const SECRET = process.env.KEY_PASS || ''
const DOMAIN = process.env.DOMAIN

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  userRole?: string;
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

    if (tenant.acknowledged) {
      const update = await db.collection('Users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { tenantId: tenant.insertedId } }
      );

      if (update.modifiedCount > 0) {
        const token = jwt.sign({ userId: userId, userRole: req.userRole, tenantId: tenant.insertedId }, SECRET, {
          expiresIn: '1h', // Set token expiration time
        });
        
        res.setHeader('Set-Cookie', [
          serialize('token', token, {
            httpOnly: false,
            secure: true, // Set secure flag in production
            domain: DOMAIN, // Set the domain without protocol
            path: '/', // Set the path
            maxAge: 60 * 60, // Set max age (in seconds), e.g., 1 hour
            sameSite: 'strict'
          }),
          serialize('refreshToken', token, {
            httpOnly: false,
            secure: true, // Set secure flag in production
            domain: DOMAIN, // Set the domain without protocol
            path: '/', // Set the path
            maxAge: 60 * 60, // Set max age (in seconds), e.g., 1 hour
            sameSite: 'strict'
          }),
        ])
        res.status(201).json({ message: `User data updated successfully` });
      } else {
        return res.status(400).json({ error: `User data updated failed`})
      }
    } else {
      return res.status(400).json({ error: 'Business registered failed'})
    }
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
