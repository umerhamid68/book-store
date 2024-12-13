import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('.env.local uri missing');
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise.then((client) => client.db('myDB'));