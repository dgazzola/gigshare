import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addGigModalStyle } from "../assets/mui-styles";

const EditGigForm = ({ gig, setShowEditGig, setGig, currentUser }) => {
  const [updatedGig, setUpdatedGig] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const formatDateForInput = (date) => {
    if (!date) return "";
    const [month, day, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const hasChanges = Object.keys(updatedGig).some(
      (key) => updatedGig[key] !== gig[key]
    );
    setIsChanged(hasChanges);
  }, [updatedGig, gig]);

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

  const deleteGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${gig.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      setShouldRedirect(true);
    } catch (err) {
      console.error(`Error deleting gig: ${err.message}`);
    }
  };

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

  const openDeleteConfirmation = () => setShowDeleteConfirmation(true);
  const closeDeleteConfirmation = () => setShowDeleteConfirmation(false);

  if (shouldRedirect) {
    return <Redirect push to="/" />
  }

  return (
    <>
      <Modal open onClose={handleClose}>
        <Box sx={addGigModalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="h2" gutterBottom>
              Edit Gig
            </Typography>
            <IconButton
              aria-label="delete gig"
              color="error"
              onClick={openDeleteConfirmation}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
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
              value={updatedGig.date || formatDateForInput(gig.date) || ""}
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
              <Button
                variant="outlined"
                sx={{
                  color: "rgba(149, 0, 255, 0.8)",
                  borderColor: "rgba(149, 0, 255, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(149, 0, 255, 0.1)",
                    borderColor: "rgba(149, 0, 255, 1)",
                  },
                }}
                type="submit"
                disabled={!isChanged}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Dialog
        open={showDeleteConfirmation}
        onClose={closeDeleteConfirmation}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this gig? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteGig();
              closeDeleteConfirmation();
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditGigForm;
