import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import GigDelete from "./GigDelete";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const EditGigForm = ({ gig, setShowEditGig, setGig, currentUser }) => {
  const [updatedGig, setUpdatedGig] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const editGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${gig.id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(updatedGig),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      const body = await response.json();
      setShowEditGig(false);
      setShouldRedirect(true);
      setGig(body.gig);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  if (shouldRedirect) {
    return <Redirect push to={`/gigs/${gig.id}`} />;
  }

  const handleInputChange = (event) => {
    setUpdatedGig({
      ...updatedGig,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    editGig();
  };

  const handleClose = () => {
    setShowEditGig(false);
  };

  return (
    <Modal open onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Gig
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={updatedGig.name || gig.name || ""}
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={updatedGig.address || gig.address || ""}
          />
          <TextField
            label="City"
            name="city"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={updatedGig.city || gig.city || ""}
          />
          <TextField
            label="State"
            name="state"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
            value={updatedGig.state || gig.state || ""}
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            value={updatedGig.date || gig.date || ""}
          />
          <TextField
            label="Start Time"
            name="startTime"
            type="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            value={updatedGig.startTime || gig.startTime || ""}
          />
          <TextField
            label="End Time"
            name="endTime"
            type="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            value={updatedGig.endTime || gig.endTime || ""}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Update Gig
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
        <GigDelete gig={gig} currentUser={currentUser} />
      </Box>
    </Modal>
  );
};

export default EditGigForm;