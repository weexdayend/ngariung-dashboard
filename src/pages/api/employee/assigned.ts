import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';

import cookie from 'cookie';
import { ObjectId } from 'mongodb';

const SECRET = process.env.KEY_PASS

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;
  const refreshToken = cookies.refreshToken;

  if (!token || !refreshToken || !SECRET) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { _id, assignedOutletId } = req.body;

  try {
    const employeeId = new ObjectId(_id);
    const outletId = new ObjectId(assignedOutletId);

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const collection = db.collection('BusinessEmployee');
    const outlet = db.collection('BusinessOutlet')

    const dataUser = await collection.findOne({ _id: employeeId });
    
    const oldOutletId = dataUser?.assignedOutletId;
    if (oldOutletId) {
      const updateOldOutlet = await outlet.updateOne(
        { _id: oldOutletId },
        { $pull: { employees: { _id: dataUser?._id } } }
      );
      if (updateOldOutlet.modifiedCount === 0) {
        return res.status(201).json({ error: 'Old outlet not found' });
      }
    }

    // Update the existing business document
    const updateUser = await collection.updateOne(
      { _id: employeeId },
      { $set: { assignedOutletId: outletId } }
    );
    if (updateUser.modifiedCount === 0) {
      return res.status(201).json({ error: 'Employee not found' });
    }

    const updateOutlet = await outlet.updateOne(
      { _id: outletId },
      { $push: { employees: { 
        _id: dataUser?._id,
        employeeName: dataUser?.employeeName,
        employeeRole: dataUser?.employeeRole,
      } } }
    );
    if (updateOutlet.modifiedCount === 0) {
      return res.status(201).json({ error: 'Outlet not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
