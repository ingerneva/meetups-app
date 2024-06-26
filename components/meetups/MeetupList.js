import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import PropTypes from 'prop-types';

MeetupList.propTypes = {
  meetups: PropTypes.array,
};

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
