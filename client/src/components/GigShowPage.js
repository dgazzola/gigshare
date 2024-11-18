import React, { useState, useEffect } from "react";
import ArtistTile from "./ArtistTile.js";
import GoogleMap from "./GoogleMap.js";
import GigFavoriteButton from "./GigFavoriteButton.js";
import EditGigForm from "./EditGigForm.js";
import AddArtistToLineup from "./AddArtistToLineup.js";

const GigShowPage = (props) => {
  const [gig, setGig] = useState({});
  const [currentArtistPage, setCurrentArtistPage] = useState(1);
  const [showEditGig, setShowEditGig] = useState(false);
  const [showAddArtist, setShowAddArtist] = useState(false);
  const id = props.match.params.id;
  const artistsPerPage = 6;

  const indexOfLastArtist = currentArtistPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = gig.artists?.slice(indexOfFirstArtist, indexOfLastArtist);
  const totalArtistPages = Math.ceil((gig.artists?.length || 0) / artistsPerPage);

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

  let lineupMessage = <h1 className="glow small">Lineup TBA</h1>;
  let artistTileComponents = "";
  if (gig.artists && gig.artists.length > 0) {
    lineupMessage = <h1 className="glow small title-bold">LineUp:</h1>;
    artistTileComponents = currentArtists.map((artistObject) => (
      <ArtistTile key={artistObject.id} {...artistObject} gig={gig} setGig={setGig}/>
    ));
  }

  return (
  <div className="hero-image grid-x">
    <div className="bg-orange rounded small-5 scroll-most" style={{ position: "relative" }}>
    {props.currentUser &&
      <div className="favorite-button-container-top">
        <GigFavoriteButton gigId={gig.id} currentUser={props.currentUser} />
      </div>
    }
      <h1 className="small title-bold" style={{ display: "inline-block" }}>
        {gig.name}
      </h1>
      <h2 className="text-white">{gig.city}, {gig.state}</h2>
      <h2 className="text-white">{gig.date}</h2>
      <h2 className="text-white">{gig.startTime}-{gig.endTime}</h2>
      <GoogleMap gig={gig} />
      {!showEditGig && props.currentUser?.id === gig.hostId &&
        <button className="button" style={{ display: "inline-block"}} onClick={() => setShowEditGig(!showEditGig)}>
          Edit Gig
        </button>
      }
      {showEditGig && !showAddArtist &&
        <EditGigForm gig={gig} setShowEditGig={setShowEditGig} setGig={setGig} currentUser={props.currentUser}/>
      }
      {!showAddArtist && props.currentUser?.id === gig.hostId &&
        <button className="button" style={{ display: "inline-block"}} onClick={() => setShowAddArtist(!showAddArtist)}>
          Add Artist
        </button>
      }
      {showAddArtist && !showEditGig &&
        <AddArtistToLineup gig={gig} setGig={setGig} setShowAddArtist={setShowAddArtist}/>
      }
    </div>

    <div className="small-6 scroll-most">
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