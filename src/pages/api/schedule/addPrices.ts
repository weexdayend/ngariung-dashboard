import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const client = await connectDB();

  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { 
    _id,
    scheduleId,
    basePrice,
    taxRate,
    serviceRate,
  } = req.body;

  try {

    const addSchedule = async (priceData: any, eventId: any, scheduleId: any) => {
      const db = client.db('sakapulse');
      const collection = db.collection('Schedule');
  
      const result = await collection.updateOne(
        {
          _id: new ObjectId(eventId),
          "schedule.scheduleId": new ObjectId(scheduleId) // Match the specific schedule item
        },
        {
          $set: {
            "schedule.$.prices.basePrice": priceData.basePrice,
            "schedule.$.prices.taxRate": priceData.taxRate,
            "schedule.$.prices.serviceRate": priceData.serviceRate
          }
        }
      );
  
      if (result.modifiedCount > 0) {
        return 'Price added successfully';
      } else {
        return 'Price added failed';
      }
    }

    const result = await addSchedule({basePrice, taxRate, serviceRate}, _id, scheduleId);

    res.status(201).json({ message: result });
  } catch (error: any) {
    return res.status(400).json({ error: error.message }); // Return a more informative error response
  }
};

export default authMiddleware(handler);
