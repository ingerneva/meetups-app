import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import PropTypes from 'prop-types';
import LoadingBackdrop from '../ui/LoadingBackdrop';
import { DataContextProvider } from '../../models/data-context';
import AppSnackbar from '../ui/AppSnackbar';

Layout.propTypes = {
  children: PropTypes.node,
};

export default function Layout(props) {
  return (
    <div>
      <DataContextProvider>
        <AppSnackbar />
        <LoadingBackdrop />
        <MainNavigation />
        <main className={classes.main}>{props.children}</main>
      </DataContextProvider>
    </div>
  );
}
