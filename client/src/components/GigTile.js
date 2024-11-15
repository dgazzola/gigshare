import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GigFavoriteButton from "./GigFavoriteButton";

const GigTile = ({ id, name, city, date, currentUser, setCurrentUser }) => {
  const gigUrl = `/gigs/${id}`;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchGigData = async () => {
      try {
      const response = await fetch(`/api/v1/gigs/${id}`);
        if (!response.ok) throw new Error(`${response.status} (${response.statusText})`);
        const parsedResponse = await response.json();

        const isFavorited = parsedResponse.gig.favorited?.some(fav => fav.id === currentUser?.id);
        setIsFavorite(isFavorited);
      } catch (err) {
        console.error(`Error fetching gig data: ${err.message}`);
      }
    };

    fetchGigData();
  }, [id, currentUser]);

  return (
    <div className="button callout cell tile-box bg-orange" style={{ position: "relative" }}>
      {/* <GigFavoriteButton gigId={id} currentUser={currentUser} setCurrentUser={setCurrentUser} /> */}
      <Link to={gigUrl} className="centered" style={{ textDecoration: "none", paddingTop: "40px" }}>
        <h4 className="title-bold">{name}</h4>
        <p className="descriptor">{city}</p>
        <p className="descriptor">{date}</p>
      </Link>
    </div>
  );
};

export default GigTile;