import { Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState, useEffect } from "react";
import '../assets/scss/main.scss';

const ToggleGroup = ({ setSelectedComponent, selectedComponent }) => {
  const [alignment, setAlignment] = useState(selectedComponent === "allGigs" ? "left" : "center");

  useEffect(() => {
    setAlignment(selectedComponent === "allGigs" ? "left" : "center");
  }, [selectedComponent]);

  const handleAlignmentChange = (event, newAlignment) => {
    event.preventDefault();
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setSelectedComponent(newAlignment === "left" ? "allGigs" : "searchGigs");
    }
  };

  return (
    <Container className="toggle-container">
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignmentChange}
        aria-label="text alignment"
        className="toggle-group"
        sx={{
          gap: '10px',
        }}
      >
        <ToggleButton 
          value="left" 
          aria-label="all gigs" 
          className={`toggle-button ${alignment === "left" ? "active" : ""}`}
          sx={{
            color: alignment === "left" ? 'white' : 'rgba(149, 0, 255, 0.8)',
            border: '2px solid rgba(149, 0, 255, 0.8)',
            borderRadius: '5px',
            fontFamily: 'Spectral, serif',
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            padding: '10px 20px',
            backgroundColor: alignment === "left" ? 'rgba(149, 0, 255, 0.8)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(149, 0, 255, 0.8)',
              color: 'white'
            }
          }}
        >
          All Gigs
        </ToggleButton>
        <ToggleButton 
          value="center" 
          aria-label="search gigs" 
          className={`toggle-button ${alignment === "center" ? "active" : ""}`}
          sx={{
            color: alignment === "center" ? 'white' : 'rgba(149, 0, 255, 0.8)',
            border: '2px solid rgba(149, 0, 255, 0.8)',
            borderRadius: '5px',
            fontFamily: 'Spectral, serif',
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            padding: '10px 20px',
            backgroundColor: alignment === "center" ? 'rgba(149, 0, 255, 0.8)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(149, 0, 255, 0.8)',
              color: 'white'
            }
          }}
        >
          Search Gigs
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
};

export default ToggleGroup;