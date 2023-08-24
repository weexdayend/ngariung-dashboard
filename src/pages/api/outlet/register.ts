import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';

import { JwtPayload, verify } from 'jsonwebtoken'; // Import verify from jsonwebtoken library

import cookie from 'cookie';

import getConfig from 'next/config';
import { ObjectId } from 'mongodb';
const { publicRuntimeConfig } = getConfig();

const SECRET = publicRuntimeConfig.KEYPASS

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
    outletName, 
    outletLine,
    outletAddress, 
    outletProvince,
    outletCity,
    outletZip, 
  } = req.body;

  try {
    // Verify the token
    const decodedToken = verify(token, SECRET) as JwtPayload; // Replace with your secret key

    // You can access the decoded token payload to get user information
    const userId = decodedToken.userId;

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const users = db.collection('Users');
    const outlet = db.collection('BusinessOutlet');

    const business = await users.findOne({ _id: new ObjectId(userId) });

    if (!business || !business.tenantId) {
      return res.status(200).json({ message: 'Business not found' });
    }

    // Check if the data is already registered
    const existingName = await outlet.findOne({ outletName });
    if (existingName) {
      return res.status(400).json({ error: 'Name already registered' });
    }

    // Create a new user document
    const newOutlet = {
      businessId: business.tenantId,
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

export default handler;
