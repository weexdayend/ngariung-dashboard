import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

// Import the cors middleware
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET'], // Add other HTTP methods as needed
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Wrap the handler in the cors middleware
  await new Promise((resolve, reject) => {
    cors(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }
  
  try {  
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
