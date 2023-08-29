import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

async function addSchedule(eventId: any, scheduleId: any, gates: any) {
  try {
    const client = await connectDB();
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
  } catch (error: any) {
    throw new Error(error.message);
  }
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { 
    _id,
    scheduleId,
    gates,
  } = req.body;

  try {
    const result = await addSchedule(_id, scheduleId, gates);

    res.status(201).json({ message: result });
  } catch (error: any) {
    return res.status(400).json({ error: error.message }); // Return a more informative error response
  }
};

export default authMiddleware(handler);
