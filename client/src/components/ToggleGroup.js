import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Container } from '@mui/material';

const ToggleGroup = ({ setSelectedComponent, selectedComponent }) => {
  const [alignment, setAlignment] = useState('left');

  const handleAlignmentChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const allGigsClick = () => {
    if (selectedComponent === "searchGigs") {
      setSelectedComponent("allGigs");
    }
  };

  const searchClick = () => {
    if (selectedComponent === "allGigs") {
      setSelectedComponent("searchGigs");
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
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
    </Container>
  );
};

export default ToggleGroup;
