import { MongoClient } from "mongodb";

const uri =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI_LOCAL
    : process.env.MONGODB_URI;

if (!uri) {
  throw new Error("No Mongo URI provided");
}

const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
