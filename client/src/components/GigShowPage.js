import React, { useState, useEffect } from "react";
import ArtistTile from "./ArtistTile.js";
import { Redirect } from "react-router-dom";
import GoogleMap from "./GoogleMap.js";
import GigFavoriteButton from "./GigFavoriteButton.js";
import EditGigButton from "./EditGigButton.js";

const GigShowPage = (props) => {
  const [gig, setGig] = useState({});
  const [updatedGig, setUpdatedGig] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [dropDown, setDropDown] = useState("");
  const [currentArtistPage, setCurrentArtistPage] = useState(1);
  const id = props.match.params.id;
  const artistsPerPage = 9;

  const sortAlphabeticallyAscending = (a, b) => {
    if (a?.artistName.toLowerCase() < b?.artistName.toLowerCase()) {
      return -1;
    }
    if (a?.artistName.toLowerCase() > b?.artistName.toLowerCase()) {
      return 1;
    }
    return 0;
  };

  const getGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      const gigData = await response.json();
      setGig(gigData.gig);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getGig();
  }, []);

  const indexOfLastArtist = currentArtistPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = gig.artists?.sort(sortAlphabeticallyAscending).slice(indexOfFirstArtist, indexOfLastArtist);
  const totalArtistPages = Math.ceil((gig.artists?.length || 0) / artistsPerPage);

  const handleNextArtistPage = () => {
    if (currentArtistPage < totalArtistPages) {
      setCurrentArtistPage(currentArtistPage + 1);
    }
  };

  const handlePreviousArtistPage = () => {
    if (currentArtistPage > 1) {
      setCurrentArtistPage(currentArtistPage - 1);
    }
  };

  let artistTileComponents = "";
  let lineupMessage = <h1 className="glow small">Lineup TBA</h1>;
  if (gig.artists && gig.artists.length > 0) {
    lineupMessage = <h1 className="glow small title-bold">LineUp:</h1>;
    artistTileComponents = currentArtists?.map((artistObject) => (
      <ArtistTile key={artistObject.id} {...artistObject} />
    ));
  }

  let favoriteCount;
  let favoritedCountDisplay = "";
  if (gig?.favorited?.length) {
    favoriteCount = gig.favorited.length;
    favoritedCountDisplay = "Favorited:";
  }

  const handleFavoriteButton = async () => {
    if (gig.isUserFavorite) {
      try {
        const response = await fetch(`/api/v1/gigs/${id}/favorites`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(gig)
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          throw new Error(errorMessage);
        }
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    } else {
      try {
        const response = await fetch(`/api/v1/gigs/${gig.id}/favorites`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(gig)
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          throw new Error(errorMessage);
        }
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
    getGig();
  };

  const editGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${gig.id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(updatedGig)
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      const body = await response.json();
      setShouldRedirect(true);
      setGig(body.gig);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const handleInputChange = (event) => {
    setUpdatedGig({
      ...updatedGig,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    editGig();
  };

  if (shouldRedirect) {
    return <Redirect push to={`/users/${props.currentUser.id}`} />;
  }

  return (
    <div className="hero-image grid-x">
      <div className="bg-orange rounded small-5 scroll">
        <h1 className="glow small title-bold">{gig.name}</h1>
        <h2 className="text-white">{gig.city}, {gig.state}</h2>
        <h2 className="text-white">{gig.date}</h2>
        <h2 className="text-white">{gig.startTime}-{gig.endTime}</h2>
        <h2 className="text-white">{favoritedCountDisplay} {favoriteCount}</h2>
        <GoogleMap gig={gig} dropDown={dropDown} />
        <GigFavoriteButton currentUser={props.currentUser} gig={gig} handleFavoriteButton={handleFavoriteButton} setGig={setGig} />
        <EditGigButton handleInputChange={handleInputChange} currentUser={props.currentUser} gig={gig} handleUpdate={handleUpdate} updatedGig={updatedGig} artists={gig.artists} />
      </div>
      <div className="small-6 scroll">
        {lineupMessage}
        <div className="centered grid-x">{artistTileComponents}</div>

        {totalArtistPages > 1 && (
          <div className="pagination-controls">
          <button
            className="pagination-button"
            onClick={handlePreviousArtistPage}
            disabled={currentArtistPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentArtistPage} of {totalArtistPages}
          </span>
          <button
            className="pagination-button"
            onClick={handleNextArtistPage}
            disabled={currentArtistPage === totalArtistPages}
          >
            Next
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default GigShowPage;