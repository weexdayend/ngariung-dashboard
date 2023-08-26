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

  const { _id, employeeName, employeePhone, employeeEmail, employeeRole, status } = req.body;

  try {
    const employeeId = new ObjectId(_id);

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const collection = db.collection('BusinessEmployee');

    // Update the existing business document
    const updateResult = await collection.updateOne(
      { _id: employeeId },
      { $set: { employeeName, employeePhone, employeeEmail, employeeRole, status } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
