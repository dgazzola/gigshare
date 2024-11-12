import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Container } from '@mui/material';

const ToggleGroup = ({ setSelectedComponent, selectedComponent }) => {
  const [alignment, setAlignment] = useState(selectedComponent === "allGigs" ? "left" : "center");

  // Synchronize alignment state with selectedComponent when it changes
  useEffect(() => {
    setAlignment(selectedComponent === "allGigs" ? "left" : "center");
  }, [selectedComponent]);

  const handleAlignmentChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setSelectedComponent(newAlignment === "left" ? "allGigs" : "searchGigs");
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
        <ToggleButton value="left" aria-label="all gigs">
          All Gigs
        </ToggleButton>
        <ToggleButton value="center" aria-label="search gigs">
          Search Gigs
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
};

export default ToggleGroup;