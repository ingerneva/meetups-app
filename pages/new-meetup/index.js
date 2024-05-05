import { useContext } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import DataContext from '../../models/data-context';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function NewMeetupPage() {
  const dataCtx = useContext(DataContext);
  const router = useRouter();
  async function addMeetupFunction(enteredMeetupData) {
    dataCtx.handleBackdropOpen();
    try {
      const response = await fetch('/api/meetups', {
        method: 'POST',
        body: JSON.stringify(enteredMeetupData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      dataCtx.handleSnackbarOpen('Your meetup has been added.', 'success');
      await router.push('/');
    } catch (error) {
      dataCtx.handleSnackbarOpen('An error occurred.', 'error');
      console.error(error);
    }
    dataCtx.handleBackdropClose();
  }

  return (
    <>
      <Head>
        <title>New Meetup</title>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupFunction} />
    </>
  );
}
