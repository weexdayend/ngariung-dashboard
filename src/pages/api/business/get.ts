import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';
import { JwtPayload, verify } from 'jsonwebtoken';
import cookie from 'cookie';
import { ObjectId } from 'mongodb';

const SECRET = process.env.KEY_PASS

async function getBusinessData(userId: any) {
  const client = await connectDB();
  const db = client.db('sakapulse');
  const userCollection = db.collection('Users');
  const businessCollection = db.collection('Business');

  const profileData = await userCollection.findOne({ _id: new ObjectId(userId) });
  const businessData = await businessCollection.findOne({
    _id: new ObjectId(profileData?.tenantId)
  });

  return businessData;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;
  const refreshToken = cookies.refreshToken;

  if (!token || !refreshToken || !SECRET) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify the token
    const decodedToken = verify(token, SECRET) as JwtPayload;
    const userId = decodedToken.userId;
    
    const businessData = await getBusinessData(userId);

    if (!businessData) {
      return res.status(200).json({ businessName: null, businessPhone: null, businessEmail: null  });
    }

    const { _id, businessName, businessPhone, businessEmail } = businessData;

    res.status(200).json({ _id, businessName, businessPhone, businessEmail });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
