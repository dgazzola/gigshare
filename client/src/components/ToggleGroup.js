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
  const allGigsClick = () => {
    if (selectedComponent==="searchGigs"){
      setSelectedComponent("allGigs")
    }
  }
  const searchClick = () => {
    if (selectedComponent==="allGigs"){
      setSelectedComponent("searchGigs")
    }
  }

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignmentChange}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned" onClick={allGigsClick}>
        All Gigs
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered" onClick={searchClick}>
        Search Gigs
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleGroup;