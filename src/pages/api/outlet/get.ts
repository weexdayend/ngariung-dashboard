import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

async function getOutletData(businessId: any) {
  const client = await connectDB();
  const db = client.db('sakapulse');
  const collection = db.collection('BusinessOutlet');

  const businessData = await collection.find(
    { 
      businessId: new ObjectId(businessId),
    },
  ).toArray();
  return businessData;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const tenantId = req.tenantId;
    const outletData = await getOutletData(tenantId)

    if (!outletData) {
      return res.status(200).json({
        data: [
          {
            _id: null,
            outletName: null,
            outletLine: null,
            outletAddress: null,
            outletProvince: null,
            outletCity: null,
            outletZip: null,
            status: null,
          },
        ],
      });
    }

    const formattedDataArray = outletData.map((dataItem) => {
      const {
        _id,
        outletName,
        outletLine,
        outletAddress,
        outletProvince,
        outletCity,
        outletZip,
        status,
      } = dataItem;
  
      return {
        _id,
        outletName,
        outletLine,
        outletAddress,
        outletProvince,
        outletCity,
        outletZip,
        status,
      };
    });
  
    res.status(200).json({ data: formattedDataArray });
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
