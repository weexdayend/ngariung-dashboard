import { NextApiRequest, NextApiResponse } from 'next';
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
    const { EventID, UserID, EventPassword } = req.body;

    // Fetch event details including EventType.password
    const queryFirst = await supabase
      .from('Events')
      .select('EventType')
      .eq('EventID', EventID);

    const response = queryFirst.data;

    if (!response || !response[0] || !response[0].EventType) {
      // Handle the case when the event or EventType is not found
      return res.status(404).json({ error: 'Event not found' });
    }

    const eventType = response[0].EventType;

    // Ensure EventType has a password property
    if (!eventType || typeof eventType !== 'object' || !('password' in eventType)) {
      return res.status(400).json({ error: 'Invalid event details' });
    }

    const eventTypePassword = eventType.password;

    // Compare EventType.password with EventPassword from the request body
    if (eventTypePassword !== EventPassword) {
      return res.status(401).json({ error: 'Incorrect event password' });
    }

    // EventType.password matches, proceed with inserting into EventParticipations
    const query = await supabase.from('EventParticipations').insert({
      EventID: EventID,
      UserID: UserID,
    });

    if (query.error) {
      throw new Error('Something went wrong!');
    }

    // Set CORS headers in the response
    res.setHeader('Access-Control-Allow-Origin', '*'); // You can replace * with your specific frontend URL

    res.status(200).json({ data: response, message: 'Book event seat successfully' });
  } catch (error) {
    console.error('Supabase query error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
