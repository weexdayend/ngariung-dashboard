import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const SECRET = publicRuntimeConfig.KEYPASS
const RFRESH = publicRuntimeConfig.REFPASS

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, SECRET) as JwtPayload;
    const userId = decoded.userId;

    const accessToken = jwt.sign({ userId }, RFRESH, {
      expiresIn: '1h',
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error refreshing token' });
  }
};
