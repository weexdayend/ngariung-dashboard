// db/connect.ts
import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI
const uri = MONGODB_URI

if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables.');
}

let cachedDb: MongoClient;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    maxPoolSize: 10, // Adjust the pool size as per your needs
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    cachedDb = client;
    return cachedDb;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectDB;
