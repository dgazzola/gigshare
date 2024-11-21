import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { addGigModalStyle, buttonStyle } from "../assets/mui-styles";

const NewGigForm = ({ currentUser, onClose, setUser }) => {
  const defaultForm = {
    name: "",
    address: "",
    city: "",
    state: "",
    date: "",
    startTime: "",
    endTime: "",
    hostId: currentUser.id,
  };

  const [newGig, setNewGig] = useState(defaultForm);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setNewGig((prev) => ({
      ...prev,
      [name]: name === "date" ? new Date(value).toISOString().slice(0, 10) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/gigs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGig),
      });
      if (response.ok) {
        const { gig } = await response.json();
        console.log('created gig return:', gig);
        setUser((prevUser) => ({
          ...prevUser,
          hostedGigs: [...prevUser.hostedGigs, gig],
        }));
        onClose();
      } else {
        console.error("Failed to create gig:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting gig:", error);
    }
  };
  

  return (
    <Box sx={addGigModalStyle}>
      <Typography variant="h6" component="h2" gutterBottom>
        Submit a Gig
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={newGig.name}
          onChange={handleInput}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Address"
          name="address"
          value={newGig.address}
          onChange={handleInput}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="City"
          name="city"
          value={newGig.city}
          onChange={handleInput}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="State"
          name="state"
          value={newGig.state}
          onChange={handleInput}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={newGig.date}
          onChange={handleInput}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Start Time"
          name="startTime"
          type="time"
          value={newGig.startTime}
          onChange={handleInput}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Time"
          name="endTime"
          type="time"
          value={newGig.endTime}
          onChange={handleInput}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" sx={buttonStyle} type="submit">
            Submit Gig
          </Button>
          <Button variant="outlined" sx={buttonStyle} onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewGigForm;