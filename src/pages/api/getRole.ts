import { NextApiRequest, NextApiResponse } from 'next';

import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
  userRole?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }

    // You can access the decoded token payload to get user information
    const userId = req.userId;
    const userRole = req.userRole;

    res.status(200).json({ _id: userId, role: userRole });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
