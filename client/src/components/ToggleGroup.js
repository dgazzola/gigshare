import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleGroup = ({ setSelectedComponent, selectedComponent }) => {
  const [alignment, setAlignment] = useState('left');
  console.log('selectedComponent', selectedComponent)

  const handleAlignmentChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const onClick = () => {
    if (selectedComponent==="allGigs"){
      setSelectedComponent("searchGigs")
    } else {
      setSelectedComponent("allGigs")
    }
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