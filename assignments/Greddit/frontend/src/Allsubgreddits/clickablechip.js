import React, { useState } from 'react';
import Chip from '@mui/material/Chip';

function ClickableChip({ tag, handleTag }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(!clicked);
    handleTag(tag);
  };

  return (
    <Chip
        margin="normal"
        mr = "20px"
        ml = "20px"
        mt = "20px"
        mb = "20px"
      label={tag}
      color={clicked ? 'secondary' : 'primary'}
      onClick={() => handleClick}
      clickable
    />
  );
}

export default ClickableChip;
