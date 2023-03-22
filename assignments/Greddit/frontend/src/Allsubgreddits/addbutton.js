import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddButton(props) {
  const fabStyles = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
  };

  return (
    <Fab sx={fabStyles} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
}

export default AddButton;