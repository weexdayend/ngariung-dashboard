import { NextApiRequest, NextApiResponse } from 'next'; 
import supabase, { DbResult } from '@/db/supabase'; 
import authMiddleware from '@/pages/api/middleware';

interface AuthenticatedRequest extends NextApiRequest {
  tenantId?: string;
}

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
   
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { tenantId } = req;

    const getBusinessData = async (tenantId: any) => {
      // const db = client.db('sakapulse');
      // const businessCollection = db.collection('Business');
    
      // const businessData = await businessCollection.findOne({
      //   _id: new ObjectId(tenantId)
      // });

      const query = supabase.from('Business').select().eq("id", tenantId);
      const businessData: DbResult<typeof query> = await query;
      
      if (!businessData || businessData.data === null) {
        return res.status(401).json({ error: 'Invalid business' });
      }
      const result = businessData.data[0]; 
    
      return businessData;
    }

    const businessData = await getBusinessData(tenantId);

    if (!businessData) {
      return res.status(200).json({ businessName: null, businessPhone: null, businessEmail: null });
    }

    const { data } = businessData;

    res.status(200).json({ id:data[0].id, businessName:data[0].name, businessPhone:data[0].phone, businessEmail:data[0].email });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export default authMiddleware(handler);
