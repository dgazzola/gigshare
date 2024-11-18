import React from "react";
import { Link } from "react-router-dom";
import GigFavoriteButton from "./GigFavoriteButton";

const GigTile = ({ id, name, city, date, currentUser }) => {
  const gigUrl = `/gigs/${id}`;

  return (
    <div className="button callout cell tile-box bg-orange" style={{ position: "relative" }}>
  {currentUser &&
  <div className="favorite-button-container-bottom">
    <GigFavoriteButton gigId={id} currentUser={currentUser} />
  </div>
  }
  <Link to={gigUrl} className="centered" style={{ textDecoration: "none", paddingTop: "40px" }}>
    <h4 className="title-bold">{name}</h4>
    <p className="descriptor">{city}</p>
    <p className="descriptor">{date}</p>
  </Link>
</div>
  );
};

export default GigTile;