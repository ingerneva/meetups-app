import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import PropTypes from 'prop-types';
import LoadingBackdrop from '../ui/LoadingBackdrop';

Layout.propTypes = {
  children: PropTypes.node,
};

export default function Layout(props) {
  return (
    <div>
      <LoadingBackdrop />
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}
