import { NextApiRequest, NextApiResponse } from 'next';
import supabase, { DbResult } from '@/db/supabase';
import connectDB from '@/db/mongodb';
import { MongoClient } from 'mongodb';

// Import the cors middleware
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['POST'], // Add other HTTP methods as needed
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {  
  // Wrap the handler in the cors middleware
  await new Promise((resolve, reject) => {
    cors(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
  });

  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
  try {
    const { serial,  } = req.body;

    const query = supabase
      .from(`CertificateWorkshop`)
      .select(`event, Events(EventName, Businesses(BusinessName))`)
      .eq('serial', serial)

    const supabaseResult: DbResult<typeof query> = await query;
    const dataSupa = supabaseResult?.data || [];

    res.status(200).json({ dataSupa });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
