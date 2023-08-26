import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';

import { JwtPayload, verify } from 'jsonwebtoken'; // Import verify from jsonwebtoken library
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import { ObjectId } from 'mongodb';

const SECRET = process.env.KEY_PASS

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const cookies = cookie.parse(req.headers.cookie || '')

  const token = cookies.token
  const refreshToken = cookies.refreshToken

  if (!token || !refreshToken || !SECRET) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { 
    employeeName, 
    employeePhone, 
    employeeEmail,
    employeeRole, 
  } = req.body;

  try {
    // Verify the token
    const decodedToken = verify(token, SECRET) as JwtPayload; // Replace with your secret key

    // You can access the decoded token payload to get user information
    const userId = decodedToken.userId;
    const userObjectId = new ObjectId(userId);

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

    const getTenant = await users.findOne({ _id: userObjectId })

    const hashedPassword = await bcrypt.hash('$akaPulse135', 10);
    const newUsers = {
      fullName: employeeName,
      phoneNumber: employeePhone,
      email: employeeEmail,
      password: hashedPassword,
      role: employeeRole.name,
      status: false,
      tenantId: getTenant?.tenantId,
    };
    const user = await users.insertOne(newUsers);

    // Create a new user document
    const newEmployee = {
      employeeName,
      employeePhone,
      employeeEmail,
      employeeRole,
      userId: user.insertedId,
      tenantId: getTenant?.tenantId,
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

export default handler;
