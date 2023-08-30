import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const client = await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { tenantId } = req;

    const getBusinessData = async (tenantId: any) => {
      const db = client.db('sakapulse');
      const businessCollection = db.collection('Business');
    
      const businessData = await businessCollection.findOne({
        _id: new ObjectId(tenantId)
      });
    
      return businessData;
    }

    const businessData = await getBusinessData(tenantId);

    if (!businessData) {
      return res.status(200).json({ businessName: null, businessPhone: null, businessEmail: null });
    }

    const { _id, businessName, businessPhone, businessEmail } = businessData;

    res.status(200).json({ _id, businessName, businessPhone, businessEmail });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
