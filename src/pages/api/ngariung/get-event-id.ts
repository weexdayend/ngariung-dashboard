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
    const { EventID } = req.body

    const query = supabase
        .from(`Events`)
        .select(`*, Businesses(*), EventParticipations(*)`).eq('EventID', EventID);
    const TypeEvents: DbResult<typeof query> = await query;

    // Set CORS headers in the response
    res.setHeader('Access-Control-Allow-Origin', '*'); // You can replace * with your specific frontend URL

    // Check if TypeEvents.data is not null
    if (TypeEvents.data !== null) {
        // Mask the password field in EventType
        const maskedData = TypeEvents.data.map(event => {
        if (event.EventType && typeof event.EventType === 'object' && 'password' in event.EventType) {
            // Create a new EventType object without modifying the original data
            const maskedEventType = { ...(event.EventType as { password?: string }), password: '********' };
            // Create a new event object with the masked EventType
            return { ...event, EventType: maskedEventType };
        }
        return event;
        });
    
        // Set CORS headers in the response
        res.setHeader('Access-Control-Allow-Origin', '*'); // You can replace * with your specific frontend URL
    
        res.status(200).json({ data: maskedData, message: 'Get event datas by id successfully' });
    } else {
        // Handle the case where TypeEvents.data is null
        res.status(400).json({ error: 'No data found' });
    }
  } catch (error) {
    console.error('Supabase query error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
