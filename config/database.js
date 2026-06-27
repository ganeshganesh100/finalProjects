const { MongoClient } = require('mongodb');



const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db();
    console.log('MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {

  }
  return db;
};


