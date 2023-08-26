import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.KEY_PASS

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
}

const authMiddleware = (handler: any) => async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (SECRET !== undefined) {
      const decoded = jwt.verify(token, SECRET) as JwtPayload;
      req.userId = decoded.userId; // Cast userId to string
      return handler(req, res);
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware;
