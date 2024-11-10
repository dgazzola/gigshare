import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleGroup = () => {
  const [alignment, setAlignment] = useState('left');

  const handleAlignmentChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const handleClick = () => {
    console.log('CLICK')
  }
  // this component needs to be handled at the gigs route and then import the other components and passing the props along for gig search and gig filter

  // also need to figure out how to filter the results in both view

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignmentChange}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned" onClick={onClick}>
        All Gigs
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered" onClick={onClick}>
        Search Gigs
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleGroup;