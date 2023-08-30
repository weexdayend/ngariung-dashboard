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
    gates,
  } = req.body;

  try {
    const addSchedule = async (eventId: any, scheduleId: any, gates: any) => {
      const db = client.db('sakapulse');
      const collection = db.collection('Schedule');
  
      const result = await collection.updateOne(
        {
          _id: new ObjectId(eventId),
          "schedule.scheduleId": new ObjectId(scheduleId) // Match the specific schedule item
        },
        {
          $set: {
            "schedule.$.gates": gates,
          }
        }
      );
  
      if (result.modifiedCount > 0) {
        return 'Gates updated successfully';
      } else {
        return 'Gates updated failed';
      }
    }
    const result = await addSchedule(_id, scheduleId, gates);

    res.status(201).json({ message: result });
  } catch (error: any) {
    return res.status(400).json({ error: error.message }); // Return a more informative error response
  } finally {
    client.close()
  }
};

export default authMiddleware(handler);
