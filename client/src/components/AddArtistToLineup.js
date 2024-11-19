import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  IconButton,
  Typography,
  Modal,
  Box,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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

const AddArtistToLineup = ({ gig, setGig, setShowAddArtist}) => {
  const [availableArtists, setAvailableArtists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchAvailableArtists = async (search = "") => {
    if (!search.trim()) {
      setAvailableArtists([]);
      return;
    }
  
    try {
      const response = await fetch(`/api/v1/artists?search=${search}`);
      if (!response.ok) {
        throw new Error(`Error fetching artists: ${response.statusText}`);
      }
      const data = await response.json();
      const gigArtistIds = gig.artists.map((artist) => artist.id);
      const addedArtistIds = artists.map((artist) => artist.id);
  
      const filteredArtists = data.artists.filter(
        (artist) => !gigArtistIds.includes(artist.id) && !addedArtistIds.includes(artist.id)
      );
  
      setAvailableArtists(filteredArtists);
    } catch (error) {
      console.error("Error fetching available artists:", error);
    }
  };
  

  const handleSearchChange = (event, newValue) => {
    setSearchInput(newValue);
    if (debounceTimer) clearTimeout(debounceTimer);
    const newTimer = setTimeout(() => {
      fetchAvailableArtists(newValue);
    }, 500);
    setDebounceTimer(newTimer);
  };

  const handleAddArtist = (artist) => {
    if (artists.some((existingArtist) => existingArtist.id === artist.id)) {
      alert("Artist is already in the lineup!");
      return;
    }

    setArtists((prevArtists) => [...prevArtists, artist]);
    setSearchInput("");
    setAvailableArtists([])
  };

  
  const handleClose = () => {
    setShowAddArtist(false);
  };
  
  const handleSave = async () => {
    const artistIds = artists.map((artist) => artist.id);
    try {
      const response = await fetch(`/api/v1/gigs/${gig.id}/lineups`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gigId: gig.id, artistIds: artistIds }),
      });
      if (!response.ok) {
        throw new Error(`Error adding artist to lineup: ${response.statusText}`);
      }

      setGig((prevGig) => ({
        ...prevGig,
        artists: [...prevGig.artists, ...artists],
      }));
      setSearchInput("");
      setArtists([]);
      setShowAddArtist(false);
    } catch (error) {
      console.error("Error updating lineup:", error);
    }
  };
  
  return (
    <Modal open onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add Artist to Lineup
        </Typography>
        <Autocomplete
          freeSolo
          options={availableArtists}
          getOptionLabel={(artist) => artist.artistName || ""}
          inputValue={searchInput}
          onInputChange={handleSearchChange}
          noOptionsText="No artists found"
          renderOption={(props, artist) => (
            <li
              {...props}
              key={artist.id}
              onClick={(e) => {
                e.stopPropagation();
                handleAddArtist(artist);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid rgba(149, 0, 255, 0.1)",
              }}
            >
              <Typography
                variant="body2"
                style={{
                  flexGrow: 1,
                  color: "rgba(149, 0, 255, 0.8)",
                  fontFamily: "Karla, sans-serif",
                }}
              >
                {artist.artistName}
              </Typography>
              <IconButton
                style={{
                  color: "rgba(149, 0, 255, 0.8)",
                }}
                aria-label="add artist to lineup"
                size="small"
                edge="end"
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Artists"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: {
                  color: "rgba(149, 0, 255, 0.8)",
                  fontFamily: "Karla, sans-serif",
                },
              }}
              inputProps={{
                ...params.inputProps,
                style: {
                  color: "black",
                  fontFamily: "Spectral, serif",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(149, 0, 255, 0.8)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(149, 0, 255, 1)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(149, 0, 255, 1)",
                  },
                },
              }}
            />
          )}
          popupIcon={null}
          PaperComponent={({ children }) => (
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
              }}
            >
              {children}
            </div>
          )}
        />
        {artists.length > 0 &&
          artists.map((artist) => (
            <Box
              key={artist.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={2}
              mt={1}
              mb={1}
              border="1px solid rgba(253, 164, 0, 0.4)"
              borderRadius="8px"
              bgcolor="rgba(253, 164, 0, 0.1)"
            >
              <Box>
                <Typography variant="body1" fontWeight="bold" color="rgba(149, 0, 255, 0.8)">
                  {artist.artistName}
                </Typography>
                <Typography variant="body2" color="rgba(149, 0, 255, 0.5)">
                  {artist.genre}
                </Typography>
              </Box>
              <IconButton
                aria-label="remove artist"
                onClick={() =>
                  setArtists((prevArtists) =>
                    prevArtists.filter((a) => a.id !== artist.id)
                  )
                }
                color="error"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          ))
        }

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" color="secondary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddArtistToLineup;