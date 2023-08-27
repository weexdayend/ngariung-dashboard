import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

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
    } else {
      res.status(200).json({ isLoggedIn: true });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
