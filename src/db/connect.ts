// db/connect.ts
import { MongoClient, ServerApiVersion } from 'mongodb';

// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();

// const PASS = publicRuntimeConfig.PASSKEY

const uri = `mongodb://0.tcp.ap.ngrok.io:19913`

// const uri = `mongodb+srv://next_app:${PASS}@cluster0.hd4oe.mongodb.net/?retryWrites=true&w=majority`;

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
