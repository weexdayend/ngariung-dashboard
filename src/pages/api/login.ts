import { NextApiRequest, NextApiResponse } from 'next';
import supabase, { DbResult } from '@/db/supabase';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET = process.env.KEY_PASS
const RFRESH = process.env.REF_PASS
const DOMAIN = process.env.DOMAIN

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   

  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
      const { email, password } = req.body;
      // Validasi bahwa email dan password ada dalam req.body
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      } 
      // Find the user by email
      const query = supabase.from('Users').select().eq("email", email);
      const CheckEmail = await query;

      if (CheckEmail.error) {
        // Handle database query error
        return res.status(500).json({ error: 'Database error' });
      }

      if (CheckEmail.data.length === 0) {
        // Handle the case where no user with the provided email is found
        return res.status(400).json({ error: 'Email not found' });
      }
      const user = CheckEmail.data[0];
      
      if (!user || user.password === null) {
        return res.status(401).json({ error: 'Invalid user or password' });
      }
      // Compare passwords
      const passwordsMatch = bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        // Handle the case where passwords do not match
        return res.status(401).json({ error: 'Invalid password' });
      }

    if (SECRET !== undefined && RFRESH !== undefined) {
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, userRole: user.role, tenantId: user.tenantId }, SECRET, {
        expiresIn: '30d', // Set token expiration time
      });
      const refreshToken = jwt.sign({ userId: user.id, userRole: user.role, tenantId: user.tenantId }, RFRESH, {
        expiresIn: '30d', // Set refresh token expiration time
      });

      res.setHeader('Set-Cookie', [
        serialize('token', token, {
          httpOnly: false,
          secure: true, // Set secure flag in production
          domain: DOMAIN, // Set the domain without protocol
          path: '/', // Set the path
          maxAge: 30 * 24 * 60 * 60, // Set max age (in seconds), e.g., 1 hour
          sameSite: 'strict'
        }),
        serialize('refreshToken', refreshToken, {
          httpOnly: false,
          secure: true, // Set secure flag in production
          domain: DOMAIN, // Set the domain without protocol
          path: '/', // Set the path
          maxAge: 30 * 24 * 60 * 60, // Set max age (in seconds), e.g., 1 hour
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
