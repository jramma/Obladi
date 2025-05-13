import { MongoClient } from "mongodb";

const uri =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI_LOCAL
    : process.env.MONGODB_URI;

if (!uri) {
  throw new Error("No Mongo URI provided");
}

const options = {
  serverSelectionTimeoutMS: 50000, 
  socketTimeoutMS: 45000,
};

let client;
let clientPromise: Promise<MongoClient>;

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalWithMongo._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalWithMongo._mongoClientPromise = client.connect();
}

clientPromise = globalWithMongo._mongoClientPromise;

export default clientPromise;
