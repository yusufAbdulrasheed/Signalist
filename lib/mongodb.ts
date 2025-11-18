// lib/mongodb.ts
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

if (!process.env.MONGODB_DB_NAME) {
  throw new Error("MONGODB_DB_NAME is missing");
}

const client = new MongoClient(process.env.MONGODB_URI);

export const betterAuthDB = client.db(process.env.MONGODB_DB_NAME);
