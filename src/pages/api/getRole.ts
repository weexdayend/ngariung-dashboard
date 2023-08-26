import { NextApiRequest, NextApiResponse } from 'next';

import { JwtPayload, verify } from 'jsonwebtoken'; // Import verify from jsonwebtoken library
import cookie from 'cookie';

const SECRET = process.env.KEY_PASS

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const cookies = cookie.parse(req.headers.cookie || '')
  
    const token = cookies.token
    const refreshToken = cookies.refreshToken
  
    if (!token || !refreshToken) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (SECRET !== undefined) {
      // Verify the token
      const decodedToken = verify(token, SECRET) as JwtPayload; // Replace with your secret key

      // You can access the decoded token payload to get user information
      const userId = decodedToken.userId;
      const userRole = decodedToken.userRole;

      res.status(200).json({ _id: userId, role: userRole });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
