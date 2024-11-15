import React from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useFavorites } from "../context/FavoritesContext";

const GigFavoriteButton = ({ gigId, currentUser }) => {
  const { favoriteGigs, toggleFavorite } = useFavorites();
  const isFavorited = favoriteGigs.some((gig) => gig.id === gigId);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (currentUser) {
      toggleFavorite(gigId, isFavorited, currentUser.id);
    } else {
      alert("Please sign in to favorite gigs!");
    }
  };

  return (
    <IconButton onClick={handleFavoriteClick}>
      {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default GigFavoriteButton;
