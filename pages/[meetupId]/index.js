import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { getMeetups } from '../../utils/db';
import PropTypes from 'prop-types';

MeetupDetails.propTypes = {
  meetupData: PropTypes.object,
};

/**
 *
 * @param {object} props
 * @param {object} props.meetupData
 * @param {string} props.meetupData.image The URL of the image.
 * @param {string} props.meetupData.title The title of the meetup.
 * @param {string} props.meetupData.address The address of the meetup location.
 * @param {string} props.meetupData.description The description of the meetup location.
 * @returns
 */
export default function MeetupDetails({ meetupData }) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}

/**
 * @type {import('next/dist/build/templates/pages').getStaticPaths} getStaticPaths
 */
export async function getStaticPaths() {
  const result = await getMeetups();
  const mappedResult = result.map((el) => ({
    params: { meetupId: el._id.toString() },
  }));
  return {
    fallback: true,
    paths: mappedResult,
    // paths: [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2  ',
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  const result = await getMeetups(context.params.meetupId);
  const mappedResult = result.map((el) => {
    const newResult = { ...el, id: el._id.toString() };
    delete newResult._id;
    return newResult;
  });
  return {
    props: {
      meetupData: mappedResult[0],
      // meetupData: {
      //   id: meetupId,
      //   image:
      //     'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
      //   title: 'A First Meetup',
      //   address: 'Some street 5, some city ',
      //   description: 'This is a first meetup',
      // },
    },
  };
}
