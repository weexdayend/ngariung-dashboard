import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/db/connect';
import { JwtPayload, verify } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const SECRET = process.env.KEY_PASS

async function getEmployeeData(userId: any) {
  const client = await connectDB();
  const db = client.db('sakapulse');
  const users = db.collection('Users');
  const collection = db.collection('BusinessEmployee');
  const outletCollection = db.collection('BusinessOutlet'); // Add this line

  const user = await users.findOne({
    _id: new ObjectId(userId),
  });

  const employeeData = await collection.find({ tenantId: user?.tenantId }).toArray();

  // Fetch outlet information for each employee
  const employeesWithOutletData = await Promise.all(
    employeeData.map(async (employee) => {
      if (employee.assignedOutletId) {
        const outlet = await outletCollection.findOne({
          _id: new ObjectId(employee.assignedOutletId),
        });
        return { ...employee, outletName: outlet?.outletName };
      }
      return employee;
    })
  );

  return employeesWithOutletData;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const cookies = req.headers.authorization
  const token = cookies;

  if (!token || !SECRET) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify the token
    const decodedToken = verify(token, SECRET) as JwtPayload;
    const userId = decodedToken.userId;

    const employeeData = await getEmployeeData(userId);

    if (!employeeData) {
      return res.status(200).json({
        data: [
          {
            _id: null,
            employeeName: null,
            employeePhone: null,
            employeeEmail: null,
            employeeRole: null,
            status: null,
          },
        ],
      });
    }

    const formattedDataArray = employeeData.map((dataItem) => {
      const {
        _id,
        employeeName,
        employeePhone,
        employeeEmail,
        employeeRole,
        status,
        outletName, // Add this line
      } = dataItem;
    
      return {
        _id,
        employeeName,
        employeePhone,
        employeeEmail,
        employeeRole,
        status,
        outletName, // Add this line
      };
    });
  
    res.status(200).json({ data: formattedDataArray });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

export default handler;
