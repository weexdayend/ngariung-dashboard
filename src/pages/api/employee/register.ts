import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import connectDB from '@/db/connect';
import bcrypt from 'bcrypt';
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
    employeeName, 
    employeePhone, 
    employeeEmail,
    employeeRole, 
  } = req.body;

  try {
    const tenantId = req.tenantId;
    const tenantObjectId = new ObjectId(tenantId)

    // Connect to the MongoDB database
    const client = await connectDB();
    const db = client.db('sakapulse');
    const users = db.collection('Users');
    const employees = db.collection('BusinessEmployee');

    const existingEmail = await employees.findOne({ employeeEmail });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const existingNumber = await employees.findOne({ employeePhone });
    if (existingNumber) {
      return res.status(400).json({ error: 'Phone number already registered'})
    }

    const hashedPassword = await bcrypt.hash('$akaPulse135', 10);
    const newUsers = {
      fullName: employeeName,
      phoneNumber: employeePhone,
      email: employeeEmail,
      password: hashedPassword,
      role: employeeRole.name,
      status: false,
      tenantId: tenantObjectId,
    };
    const user = await users.insertOne(newUsers);

    // Create a new user document
    const newEmployee = {
      employeeName,
      employeePhone,
      employeeEmail,
      employeeRole,
      userId: user.insertedId,
      tenantId: tenantObjectId,
      assignedOutletId: null,
      status: false
    };
    await employees.insertOne(newEmployee);

    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authMiddleware(handler);
