import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { getMeetups } from '../utils/db';
import PropTypes from 'prop-types';
import Error from 'next/error';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 some city',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 some city',
    description: 'This is a second meetup!',
  },
];

HomePage.propTypes = {
  errorCode: PropTypes.number,
  meetups: PropTypes.array,
};

export default function HomePage({ errorCode, meetups }) {
  return errorCode ? (
    <Error statusCode={errorCode} />
  ) : (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly React meetups!"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export async function getStaticProps() {
  try {
    const result = await getMeetups();
    const mappedResult = result.map((el) => {
      const newResult = { ...el, id: el._id.toString() };
      delete newResult._id;
      return newResult;
    });
    return {
      props: {
        meetups: mappedResult,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: {
        errorCode: 500,
      },
    };
  }
}
