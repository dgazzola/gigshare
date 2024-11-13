const ToggleGroup = ({ setSelectedComponent, selectedComponent }) => {
  console.log("Rendering ToggleGroup");
  const [alignment, setAlignment] = useState(selectedComponent === "allGigs" ? "left" : "center");
  console.log('test')

  useEffect(() => {
    console.log("Selected component changed:", selectedComponent); // Log when selectedComponent changes
    setAlignment(selectedComponent === "allGigs" ? "left" : "center");
  }, [selectedComponent]);
  

  useEffect(() => {
    setAlignment(selectedComponent === "allGigs" ? "left" : "center");
  }, [selectedComponent]);

  const handleAlignmentChange = (event, newAlignment) => {
    event.preventDefault()
    console.log("Alignment changed:", newAlignment); // Check if this fires
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setSelectedComponent(newAlignment === "left" ? "allGigs" : "searchGigs");
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      {console.log("Rendering ToggleGroup UI")}
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
