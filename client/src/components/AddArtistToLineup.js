import React, { useState } from "react";
import { Autocomplete, TextField, IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddArtistToLineupButton = ({ gig }) => {
  const [showLineupDropdown, setShowLineupDropdown] = useState(false);
  const [availableArtists, setAvailableArtists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Fetch artists based on the search query
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
      setAvailableArtists(data.artists || []);
    } catch (error) {
      console.error("Error fetching available artists:", error);
      setAvailableArtists([]);
    }
  };

  // Handle search input changes with debounce
  const handleSearchChange = (event, newValue) => {
    setSearchText(newValue || "");
    if (debounceTimer) clearTimeout(debounceTimer);

    const trimmedValue = newValue?.trim() || "";
    if (!trimmedValue) {
      setAvailableArtists([]);
      return;
    }

    const newTimer = setTimeout(() => {
      fetchAvailableArtists(trimmedValue);
    }, 500);
    setDebounceTimer(newTimer);
  };

  // Handle adding an artist to the lineup
  const handleAddArtist = async (artist) => {
    if (gig.artists?.some((gigArtist) => gigArtist.id === artist.id)) {
      alert("Artist is already in the lineup!");
      return;
    }

    try {
      const response = await fetch(`/api/v1/gigs/${gig.id}/lineups`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gigId: gig.id, artistId: artist.id }),
      });
      if (!response.ok) {
        throw new Error(`Error adding artist to lineup: ${response.statusText}`);
      }
      setShowLineupDropdown(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating lineup:", error);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="button"
        onClick={() => setShowLineupDropdown(!showLineupDropdown)}
      >
        Add Artist
      </button>

      {showLineupDropdown && (
        <div className="info-wrap">
          <Autocomplete
            freeSolo
            options={availableArtists}
            value={searchText || ""}
            onInputChange={handleSearchChange}
            getOptionLabel={(artist) => artist.artistName || ""}
            noOptionsText="No artists found"
            renderOption={(props, artist) => (
              <li
                {...props}
                key={artist.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddArtist(artist);
                  }}
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
            renderInput={(params) =>
              params ? (
                <TextField
                  {...params}
                  label="Search Artists"
                  variant="outlined"
                  fullWidth
                  slotProps={{
                    inputLabel: {
                      style: {
                        color: "rgba(149, 0, 255, 0.8)",
                        fontFamily: "Karla, sans-serif",
                      },
                    },
                    htmlInput: {
                      style: {
                        color: "black",
                        fontFamily: "Spectral, serif",
                        autoComplete: "off",
                      },
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
              ) : null
            }
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
        </div>
      )}
    </div>
  );
};

export default AddArtistToLineupButton;
