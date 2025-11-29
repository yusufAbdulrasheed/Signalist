import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME!;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}
if (!dbName) {
  throw new Error("MONGODB_DB_NAME environment variable is not set");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// eslint-disable-next-line prefer-const
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDB() {
  const client = await clientPromise;
  return client.db(dbName);
}