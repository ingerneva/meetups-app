import { MongoClient } from 'mongodb';

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
    if (meetUps === undefined) {
      meetUps = await db.collection('meetups').find().toArray();
    } else {
      meetUps = await db
        .collection('meetups')
        .find({ _id: meetupId })
        .toArray();
    }

    await client.close();
    return meetUps;
  } catch (error) {
    console.info(error.stack);
  }
}

export async function addMeetup(meetupData) {
  try {
    const client = await MongoClient.connect(connString);
    const db = client.db();

    const data = meetupData;
    const { title, image, address, description } = meetupData;

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.info(result);

    await client.close();
    return { message: 'Meetup inserted!' };
  } catch (error) {
    console.info(error.stack);
  }
}
