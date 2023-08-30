import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const client = await connectDB();

  const { businessName, businessPhone, businessEmail } = req.body;

  try {
    const tenantId = req.tenantId;
    const tenantObjectId = new ObjectId(tenantId);

    const db = client.db('sakapulse');
    const businessCollection = db.collection('Business');

    const updateResult = await businessCollection.updateOne(
      { _id: tenantObjectId },
      { $set: { businessName, businessPhone, businessEmail } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ error: 'Business not found' });
    }

    res.status(200).json({ message: 'Business updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  } finally {
    client.close()
  }
};

export default authMiddleware(handler);
