import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext({
  backdropOpen: false,
  handleBackdropOpen: () => {},
  handleBackdropClose: () => {},
  snackbarConfig: {
    open: false,
    message: '',
    severity: 'success',
  },
  handleSnackbarOpen: () => {},
  handleSnackbarClose: () => {},
});

export const DataContextProvider = (props) => {
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleBackdropOpen = () => {
    setBackdropOpen(true);
  };

  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarConfig({
      open: true,
      message,
      severity,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarConfig((old) => ({
      ...old,
      open: false,
    }));
  };

  const contextValue = useMemo(
    () => ({
      backdropOpen,
      handleBackdropOpen,
      handleBackdropClose,
      snackbarConfig,
      handleSnackbarOpen,
      handleSnackbarClose,
    }),
    [
      backdropOpen,
      handleBackdropOpen,
      handleBackdropClose,
      snackbarConfig,
      handleSnackbarOpen,
      handleSnackbarClose,
    ],
  );

  DataContextProvider.propTypes = {
    children: PropTypes.node,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
