import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware from './middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
}

const protectedRouteHandler = (req: AuthenticatedRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Protected route', userId: req.userId });
};

export default authMiddleware(protectedRouteHandler);
