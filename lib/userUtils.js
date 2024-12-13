import dbPromise from './db';

export function getSessionUserId(req) {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === 'dummy-token') {
    return 1;
  }
  return null;
}

export async function getUserHistory(userId) {
  const db = await dbPromise;
  return await db.collection('userHistory').find({ userId }).sort({ date: -1 }).toArray();
}

export async function addSearchQuery(userId, query) {
  const db = await dbPromise;
  return await db.collection('userHistory').insertOne({ userId, query, date: new Date() });
}







