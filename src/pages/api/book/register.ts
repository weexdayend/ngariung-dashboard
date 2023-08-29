import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { 
    customerName, 
    eventId,
    scheduleId,
  } = req.body;

  try {
    const tenantId = req.tenantId;

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const collection = db.collection('BookEvent');

    // Create a new user document
    const newBooking = {
      customerName,
      eventId: new ObjectId(eventId),
      scheduleId: new ObjectId(scheduleId),
      status: false,
      tenantId: new ObjectId(tenantId)
    };
    const insert =await collection.insertOne(newBooking);

    if (insert.acknowledged){
      const schedule = db.collection('Schedule');
      const update =await schedule.updateOne(
        {
          _id: new ObjectId(eventId),
          "schedule.scheduleId": new ObjectId(scheduleId) // Match the specific schedule item
        },
        {
          $set: {
            "schedule.currentBookings": +1,
          }
        }
      );

      if (update.modifiedCount > 0) {
        res.status(201).json({ message: 'Booking schedule successfully' });
      } else {
        res.status(201).json({ message: 'Booking schedule has failed' });
      }
    } else {
      res.status(201).json({ message: 'Insert data has failed' });
    }

    
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
