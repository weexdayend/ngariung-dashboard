import { NextApiRequest, NextApiResponse } from 'next';
import supabase, { DbResult } from '@/db/supabase';
import connectDB from '@/db/mongodb';
import { MongoClient } from 'mongodb';

// Function to check if two stageDetails are equal
function areStagesEqual(stage1: any, stage2: any) {
    return stage1.stage === stage2.stage && stage1.status === stage2.status;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
let client: MongoClient | undefined;
  

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    client = await connectDB();

    if (!client) {
      throw new Error('Failed to connect to the database.');
    }

    const { EventID, EventStageID } = req.body;

    // Fetch data from MongoDB with pagination
    const getEmployeeData = async () => {
      const db = client!.db('test');
      const users = db.collection('users');
      const data = await users.find().toArray();

      return data;
    };

    const query = supabase
      .from(`StageCheckpoints`)
      .select(`StageCheckpointID, EventStageID, UserID, EventStageStatus, Automate, EventStages(EventStageName)`)
      .eq('EventID', EventID)

    const supabaseResult: DbResult<typeof query> = await query;

    const dataSupa = supabaseResult?.data || [];
    const dataMongo = await getEmployeeData();

    const userMap = new Map();
    dataMongo.forEach(user => {
      userMap.set(user.id, user); // Use the correct key
    });

    const combinedData = dataSupa.map((item: any) => {
      const userDetail = userMap.get(item.UserID); // Use the correct key
      const { id, username, name } = userDetail || {};
      return {
        ...item,
        user: {
          id,
          username,
          name,
        },
      };
    });

    const groupedData = combinedData.reduce((acc, item) => {
        const { UserID, EventStages, ...rest } = item;
        
        if (!acc[UserID]) {
            acc[UserID] = {
            user: item.user,
            stages: [],
            };
        }
        
        // Extract stage details
        const stageDetail = {
            stage: item.EventStageID || 'Unknown Stage',
            status: item.EventStageStatus,
        };
        
        // Check if the stageDetail already exists in the stages array
        const isDuplicate = acc[UserID].stages.some((existingStage: any) =>
            areStagesEqual(existingStage, stageDetail)
        );
        
        // If not a duplicate, add stageDetail to the stages array
        if (!isDuplicate) {
            acc[UserID].stages.push(stageDetail);
        }
        
        return acc;
    }, {});

    // Convert groupedData to an array
    const result = Object.values(groupedData);

    res.status(200).json({ result });
  } catch (error: any) {
        return res.status(500).json({ error: error.message });
  } finally {
    if (client) {
        await client.close();
    }
  }
};

export default handler;
