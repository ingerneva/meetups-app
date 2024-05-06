import { MongoClient, ObjectId } from 'mongodb';

const user = process.env.DB_USER;
const password = encodeURIComponent(process.env.DB_PASS);
const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTER;
const connString = `mongodb+srv://${user}:${password}@${dbCluster}.o8zzu0e.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbCluster}`;

export async function getMeetups(meetupId) {
  try {
    const client = await MongoClient.connect(connString);
    const db = client.db();

    let meetUps;
    if (meetupId === undefined) {
      meetUps = await db.collection('meetups').find().toArray();
    } else {
      meetUps = await db
        .collection('meetups')
        .find({ _id: new ObjectId(meetupId) })
        .toArray();
    }

    await client.close();
    return meetUps;
  } catch (error) {
    console.error(error.stack);
  }
}

/**
 *
 * @param {object} meetupData
 * @param {string} meetupData.title
 * @param {string} meetupData.image The image URL.
 * @param {string} meetupData.address
 * @param {string} meetupData.description
 * @returns {{message: string}}
 */
export async function addMeetup(meetupData) {
  const client = await MongoClient.connect(connString);
  const db = client.db();

  const data = meetupData;

  const meetupsCollection = db.collection('meetups');
  await meetupsCollection.insertOne(data);

  await client.close();
  return { message: 'Meetup inserted!' };
}
