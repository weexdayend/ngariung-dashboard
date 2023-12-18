import { NextApiRequest, NextApiResponse } from 'next';
import supabase, { DbResult } from '@/db/supabase';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie'; 
import authMiddleware from '@/pages/api/middleware';

const SECRET = process.env.KEY_PASS || '';
const DOMAIN = process.env.DOMAIN;

interface AuthenticatedRequest extends NextApiRequest {
  UserID?: string;
  UserRole?: string;
}

const isAlreadyRegistered = async (field: any, value: any) => {
  const query = supabase.from('Business').select().eq(field, value);
  const TypeEvents: DbResult<typeof query> = await query;

  return TypeEvents;
};

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { 
    businessName, 
    businessPhone, 
    businessEmail 
  } = req.body;

  try {
    const userId = req.UserID;
    let message;

    if (!userId || userId === null) {
      return res.status(401).json({ error: 'Invalid user or password' });
    }
     
    const checkName = await isAlreadyRegistered('BusinessName', businessName);
    if (checkName.data?.length ?? 0 > 0) {
      message = 'Business name already registered';
      return res.status(201).json({ message: message });  
    }
  
    const checkPhone = await isAlreadyRegistered('BusinessPhone', businessPhone);
    if (checkPhone.data?.length ?? 0 > 0) {
      message = 'Business phone already registered';
      return res.status(201).json({ message: message });  
    }

    const checkEmail = await isAlreadyRegistered('BusinessEmail', businessEmail);
    if (checkEmail.data?.length ?? 0 > 0) {
      message = 'Business email already registered';
      return res.status(201).json({ message: message });  
    }
    
    const query = supabase
      .from('Businesses')
      .insert({
        BusinessName: businessName,
        BusinessPhone: businessPhone,
        BusinessEmail: businessEmail,
        status: false,
      })
      .select()
    const Business: DbResult<typeof query> = await query;

    if (Business.error) {
      return res.status(500).json({ error: 'Business registering failed' });
    }
       
    const { data, error } = await supabase
    .from('Users')
    .update({ BusinessID: Business.data[0].BusinessID })
    .eq('id', userId)
    .select()
    
    if (error) {
      return res.status(500).json({ error: 'update users error' });
    }

    const token = jwt.sign(
      { userId, userRole: req.UserRole, tenantId: data[0].BusinessID },
      SECRET,
      { expiresIn: '1h' }
    );

    res.setHeader('Set-Cookie', [
      serialize('token', token, {
        httpOnly: false,
        secure: true,
        domain: DOMAIN,
        path: '/',
        maxAge: 60 * 60,
        sameSite: "strict"
      }),
      serialize('refreshToken', token, {
        httpOnly: false,
        secure: true,
        domain: DOMAIN,
        path: '/',
        maxAge: 60 * 60,
        sameSite: "strict"
      })
    ]);

    res.status(201).json({ message: 'User data updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
