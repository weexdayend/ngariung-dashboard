import { NextApiRequest, NextApiResponse } from 'next';
import supabase, { DbResult } from '@/db/supabase';
import bcrypt from 'bcrypt'; 

const isAlreadyRegistered = async (field: any, value: any) => {
  const query = supabase.from('Users').select().eq(field, value);
  const TypeEvents: DbResult<typeof query> = await query;

  return TypeEvents;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { fullName, phoneNumber, email, password } = req.body;

  try {

    let message;

    const checkEmail = await isAlreadyRegistered('UserEmail', email);
    if (checkEmail.data?.length ?? 0 > 0) {
      message = 'Email already registered';
      return res.status(201).json({ message: message });  
    }
  
    const checkPhone = await isAlreadyRegistered('UserPhone', phoneNumber);
    if (checkPhone.data?.length ?? 0 > 0) {
      message = 'Phone already registered';
      return res.status(201).json({ message: message });  
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = supabase
      .from('Users')
      .insert({
        UserHunterName: fullName,
        UserPhone: phoneNumber,
        UserEmail: email,
        UserPassword: hashedPassword,
        UserRole: 'admin',
        UserStatus: true
      })
      .select()
    const TypeEvents: DbResult<typeof query> = await query;

    if (TypeEvents.error) {
      return res.status(500).json({ error: 'Error registering user' });
    }

    message = 'User has successfully registered';
    return res.status(201).json({ message: message });  
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error registering user' });
  }
};

export default handler;