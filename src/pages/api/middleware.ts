import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.PASS_KEY

interface AuthenticatedRequest extends NextApiRequest {
  UserID?: string;
  BusinessID?: string;
}

const authMiddleware = (handler: any) => async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (SECRET !== undefined) {
      const decoded = jwt.verify(token, SECRET) as JwtPayload;
      req.UserID = decoded.UserID;
      req.BusinessID = decoded.BusinessID;
      return handler(req, res);
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware;
