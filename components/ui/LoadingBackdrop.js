import { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DataContext from '../../models/data-context';

export default function LoadingBackdrop() {
  const dataCtx = useContext(DataContext);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={dataCtx.backdropOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
