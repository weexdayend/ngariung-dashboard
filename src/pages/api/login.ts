import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const SECRET = publicRuntimeConfig.KEYPASS
const RFRESH = publicRuntimeConfig.REFPASS

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const client = await connectDB();
    const db = client.db('sakapulse');
    const collection = db.collection('Users');

    // Find the user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Your email is invalid' });
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Your password is invalid' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, SECRET, {
      expiresIn: '1h', // Set token expiration time
    });
    const refreshToken = jwt.sign({ userId: user._id }, RFRESH, {
      expiresIn: '1h', // Set refresh token expiration time
    });

    res.setHeader('Set-Cookie', [
      serialize('token', token, {
        httpOnly: false,
        secure: true, // Set secure flag in production
        domain: '*.vercel.app', // Set the domain without protocol
        path: '/', // Set the path
        maxAge: 60 * 60, // Set max age (in seconds), e.g., 1 hour
        sameSite: 'strict'
      }),
      serialize('refreshToken', refreshToken, {
        httpOnly: false,
        secure: true, // Set secure flag in production
        domain: '*.vercel.app', // Set the domain without protocol
        path: '/', // Set the path
        maxAge: 60 * 60, // Set max age (in seconds), e.g., 1 hour
        sameSite: 'strict'
      }),
    ])

    res.status(201).json({ message: 'Welcome back to SakaPulse' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

export default handler;
