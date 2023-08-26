import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET = process.env.KEY_PASS
const RFRESH = process.env.REF_PASS

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    const { email, password } = req.body;
    
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

    if (SECRET !== undefined && RFRESH !== undefined) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, userRole: user.role, tenantId: user.tenantId }, SECRET, {
        expiresIn: '1h', // Set token expiration time
      });
      const refreshToken = jwt.sign({ userId: user._id, userRole: user.role, tenantId: user.tenantId }, RFRESH, {
        expiresIn: '1h', // Set refresh token expiration time
      });

      res.setHeader('Set-Cookie', [
        serialize('token', token, {
          httpOnly: false,
          secure: true, // Set secure flag in production
          domain: 'localhost', // Set the domain without protocol
          path: '/', // Set the path
          maxAge: 60 * 60, // Set max age (in seconds), e.g., 1 hour
          sameSite: 'strict'
        }),
        serialize('refreshToken', refreshToken, {
          httpOnly: false,
          secure: true, // Set secure flag in production
          domain: 'localhost', // Set the domain without protocol
          path: '/', // Set the path
          maxAge: 60 * 60, // Set max age (in seconds), e.g., 1 hour
          sameSite: 'strict'
        }),
      ])

      res.status(201).json({ message: 'Welcome back to SakaPulse' });
    } else {
      res.status(500).json({ message: 'Environment variable is not defined' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

export default handler;
