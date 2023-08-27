import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
}

async function addSchedule(scheduleData: any, tenantId: any) {
  try {
    const client = await connectDB();
    const db = client.db('sakapulse');
    const collection = db.collection('FitnessClass');

    const existingSchedule = await collection.findOne({
      date: scheduleData.date,
      outletId: new ObjectId(scheduleData.outlet),
      tenantId: new ObjectId(tenantId),
      schedule: {
        $elemMatch: {
          className: scheduleData.schedule[0].className,
          room: scheduleData.schedule[0].room,
          $or: [
            {
              startTime: {
                $gte: scheduleData.schedule[0].startTime,
                $lt: scheduleData.schedule[0].endTime,
              },
            },
            {
              endTime: {
                $gt: scheduleData.schedule[0].startTime,
                $lte: scheduleData.schedule[0].endTime,
              },
            },
            {
              $and: [
                {
                  startTime: {
                    $lt: scheduleData.schedule[0].startTime,
                  },
                  endTime: {
                    $gt: scheduleData.schedule[0].endTime,
                  },
                },
              ],
            },
          ],
        },
      },
    });

    if (existingSchedule) {
      // Handle schedule conflict
      throw new Error('Schedule conflict detected');
    } else {
      // Insert the new schedule data
      const result = await collection.updateOne(
        {
          date: scheduleData.date,
          outletId: new ObjectId(scheduleData.outlet),
          tenantId: new ObjectId(tenantId),
        },
        {
          $push: {
            schedule: {
              instructor: scheduleData.schedule[0].instructor,
              classType: scheduleData.schedule[0].classType,
              className: scheduleData.schedule[0].className,
              startTime: scheduleData.schedule[0].startTime,
              endTime: scheduleData.schedule[0].endTime,
              maxBookings: scheduleData.schedule[0].maxBookings,
              room: scheduleData.schedule[0].room,
              currentBookings: 0,
            }
          }
        }
      );
    
      if (result.modifiedCount > 0) {
        return 'Schedule added successfully';
      } else if (result.matchedCount === 0) {
        const insertResult = await collection.insertOne({
          date: scheduleData.date,
          outletId: new ObjectId(scheduleData.outlet),
          tenantId: new ObjectId(tenantId),
          schedule: scheduleData.schedule
        });
    
        if (insertResult.acknowledged) {
          return 'New schedule added successfully';
        } else {
          throw new Error('Failed to add new schedule');
        }
      } else {
        throw new Error('Failed to add schedule');
      }
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
    date,
    outlet,
    schedule,
  } = req.body;

  try {
    const userId = req.userId;
    const tenantId = req.tenantId;
    
    const client = await connectDB();
    const db = client.db('sakapulse');
    const users = db.collection('Users');
    const outlets = db.collection('BusinessOutlet');

    const business = await users.findOne({ _id: new ObjectId(userId) });
    if (!business || !business.tenantId) {
      return res.status(200).json({ message: 'Business not found' });
    }

    const checkOutlet = await outlets.findOne({ businessId: tenantId })
    if (!checkOutlet) {
      return res.status(200).json({ message: 'Outlet not found' })
    }

    const result = await addSchedule({date, outlet, schedule}, tenantId);

    res.status(201).json({ message: result });
  } catch (error: any) {
    return res.status(400).json({ error: error.message }); // Return a more informative error response
  }
};

export default authMiddleware(handler);
