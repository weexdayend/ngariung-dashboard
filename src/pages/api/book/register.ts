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
    customerName, 
    eventId,
    scheduleId,
  } = req.body;

  try {
    const tenantId = req.tenantId;
    const db = client.db('sakapulse');
    const bookingCollection = db.collection('BookEvent');
    const scheduleCollection = db.collection('Schedule');

    const newBooking = {
      customerName,
      eventId: new ObjectId(eventId),
      scheduleId: new ObjectId(scheduleId),
      status: false,
      tenantId: new ObjectId(tenantId)
    };

    const insertResult = await bookingCollection.insertOne(newBooking);

    if (insertResult.acknowledged) {
      const updateResult = await scheduleCollection.updateOne(
        {
          _id: new ObjectId(eventId),
          "schedule.scheduleId": new ObjectId(scheduleId)
        },
        {
          $inc: { "schedule.currentBookings": 1 }
        }
      );

      if (updateResult.modifiedCount > 0) {
        res.status(201).json({ message: 'Booking schedule successfully' });
      } else {
        res.status(201).json({ message: 'Booking schedule has failed' });
      }
    } else {
      res.status(201).json({ message: 'Insert data has failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  } finally {
    client.close()
  }
};

export default authMiddleware(handler);
