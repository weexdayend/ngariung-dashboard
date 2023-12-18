import { NextApiRequest, NextApiResponse } from 'next';
import authMiddleware from '@/pages/api/middleware';
import supabase, { DbResult } from '@/db/supabase';

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
    const { EventID, UserID } = req.body

    const query = supabase
        .from(`StageCheckpoints`)
        .select(`*`).eq('EventID', EventID).eq('UserID', UserID);
    const TypeEvents: DbResult<typeof query> = await query;

    // Set CORS headers in the response
    res.setHeader('Access-Control-Allow-Origin', '*'); // You can replace * with your specific frontend URL

    res.status(200).json({ data: TypeEvents.data, message: 'Get event datas by id successfully' });
  } catch (error) {
    console.error('Supabase query error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
