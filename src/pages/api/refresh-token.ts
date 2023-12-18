import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.PASS_KEY;
const RFRESH = process.env.PASS_KEY;

const refreshTokenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { refreshToken } = req.body;

  try {
    if (SECRET !== undefined && RFRESH !== undefined) {
      const decoded = jwt.verify(refreshToken, SECRET) as JwtPayload;
      const userId = decoded.userId;

      const accessToken = jwt.sign({ userId }, RFRESH, {
        expiresIn: '1h',
      });

      res.status(200).json({ accessToken });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error refreshing token' });
  }
};

export default refreshTokenHandler;
