import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { fullName, phoneNumber, email, password } = req.body;

  try {
    const client = await connectDB();
    const db = client.db("sakapulse")
    const collection = db.collection('Users');
    const business = db.collection('Business');

    // Check if the data is already registered
    const existingEmail = await collection.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const existingNumber = await collection.findOne({ phoneNumber });
    if (existingNumber) {
      return res.status(400).json({ error: 'Phone number already registered'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newBusiness = {
      businessName: null,
      businessPhone: null,
      businessEmail: null,
      status: true
    };
    const insert = await business.insertOne(newBusiness)
    // Create a new user document
    const newUser = {
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
      role: 'admin',
      status: true,
      tenantId: new ObjectId(insert.insertedId),
    };
    await collection.insertOne(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error registering user' });
  }
};

export default handler;