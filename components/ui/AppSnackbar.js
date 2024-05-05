import { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DataContext from '../../models/data-context';
import { Alert } from '@mui/material';

export default function AppSnackbar() {
  const dataCtx = useContext(DataContext);

  const handleClose = (event, reason) => {
    dataCtx.handleSnackbarClose();
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={dataCtx.snackbarConfig.open}
        autoHideDuration={5000}
        onClose={handleClose}>
        <Alert
          action={action}
          onClose={handleClose}
          severity={dataCtx.snackbarConfig.severity}
          variant="filled"
          sx={{ width: '100%' }}>
          {dataCtx.snackbarConfig.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
