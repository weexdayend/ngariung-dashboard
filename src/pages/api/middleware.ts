import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.KEY_PASS

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
  userRole?: string;
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
      req.userId = decoded.userId;
      req.tenantId = decoded.tenantId;
      req.userRole = decoded.userRole;
      return handler(req, res);
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware;
