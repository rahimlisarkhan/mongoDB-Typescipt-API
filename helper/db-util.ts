
import { MongoClient } from 'mongodb';
import { hashPassword } from './const-util';

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://rahimlisarkhan:Nln3rszwEtQTYgEY@cluster0.zh3x7.mongodb.net/codioSolitions?retryWrites=true&w=majority'
  );

  return client;
}

export const insertDocument = async (client: any, collection: string, document: any) => {
  const db = client.db();

  if (document.password) {
    document.password = await hashPassword(document.password)
  }

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export const getAllDocuments = async (client: any, collection: string, sort: object) => {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();

  return documents;
}

export const uniqueEmailDataBase = async (client:any, collection: string, document: any) => {
  const db = client.db();
  const userEmailCheck = db.collection(collection).findOne(document)

  return userEmailCheck
}