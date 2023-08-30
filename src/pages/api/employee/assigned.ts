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

  const { _id, assignedOutletId } = req.body;

  try {
    const employeeId = new ObjectId(_id);
    const outletId = new ObjectId(assignedOutletId);

    const db = client.db('sakapulse');
    const collection = db.collection('BusinessEmployee');
    const outlet = db.collection('BusinessOutlet');

    const dataUser = await collection.findOne({ _id: employeeId });
    
    if (dataUser) {
      // Remove employee from the old outlet
      const updateOldOutlet = await outlet.updateOne(
        { _id: dataUser.assignedOutletId },
        { $pull: { employees: { _id: dataUser._id } } }
      );

      if (updateOldOutlet.modifiedCount === 0) {
        return res.status(400).json({ error: 'Old outlet not found' });
      }
      
      // Update the employee's assigned outlet
      const updateUser = await collection.updateOne(
        { _id: employeeId },
        { $set: { assignedOutletId: outletId } }
      );

      if (updateUser.modifiedCount === 0) {
        return res.status(400).json({ error: 'Employee not found' });
      }
      
      // Add employee to the new outlet
      const updateOutlet = await outlet.updateOne(
        { _id: outletId },
        { $push: { employees: {
          _id: dataUser._id,
          employeeName: dataUser.employeeName,
          employeePhone: dataUser.employeePhone,
          employeeRole: dataUser.employeeRole,
        } } }
      );

      if (updateOutlet.modifiedCount === 0) {
        return res.status(400).json({ error: 'Outlet not found' });
      }
      
      res.status(200).json({ message: 'Employee updated successfully' });
    } else {
      res.status(400).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
