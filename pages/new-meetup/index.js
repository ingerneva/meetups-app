import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetupPage() {
  async function addMeetupFunction(enteredMeetupData) {
    try {
      console.info(enteredMeetupData);
      const response = await fetch('/api/meetups', {
        method: 'POST',
        body: JSON.stringify(enteredMeetupData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.info(data);
    } catch (error) {
      console.error(error.stack);
    }
  }

  return <NewMeetupForm onAddMeetup={addMeetupFunction} />;
}
