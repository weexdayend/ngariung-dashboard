import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  userId?: string;
  tenantId?: string;
  collectionId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const client = await connectDB();

  const { roomId, assignedOutletId } = req.body;

  try {
    const roomIdObject = new ObjectId(roomId);
    const outletId = new ObjectId(assignedOutletId);

    // Connect to the MongoDB database
    const db = client.db('sakapulse');
    const collection = db.collection('BusinessOutlet');
    const room = db.collection('BusinessRoom')

    const dataRoom = await room.findOne({ _id: roomIdObject })

    const oldOutletId = dataRoom?.assignedOutletId;
    if (oldOutletId) {
      const updateOldOutlet = await collection.updateOne(
        { _id: oldOutletId },
        { $pull: { rooms: { _id: dataRoom?._id } } }
      );
      if (updateOldOutlet.modifiedCount === 0) {
        return res.status(201).json({ error: 'Old outlet not found' });
      }
    }

    // Update the existing business document
    const updateRoom = await room.updateOne(
      { _id: roomIdObject },
      { $set: { assignedOutletId: outletId } }
    );
    if (updateRoom.modifiedCount === 0) {
      return res.status(201).json({ error: 'Room not found' });
    }

    const updateOutlet = await collection.updateOne(
      { _id: outletId },
      { $push: { rooms: {
        _id: dataRoom?._id,
        roomName: dataRoom?.roomName
      } } }
    );
    if (updateOutlet.modifiedCount === 0) {
      return res.status(201).json({ error: 'Outlet not found' });
    }

    res.status(200).json({ message: 'Room updated successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
