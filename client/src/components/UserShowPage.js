import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import GigTile from './GigTile.js';
import Dropzone from "react-dropzone";
import GigFavoriteButton from "./GigFavoriteButton";
import '../assets/scss/main.scss';
import { useFavorites } from '../context/FavoritesContext.js';

const UserShowPage = (props) => {
  const { id } = props.match.params;
  const currentUser = props.currentUser;
  const [user, setUser] = useState({ artist: [], favoriteGigs: [], hostedGigs: [], profileImage: "" });
  const [newProfileImage, setNewProfileImage] = useState({ image: {} });
  const [uploadedImage, setUploadedImage] = useState({ preview: "" });
  const [favoriteGigsPage, setFavoriteGigsPage] = useState(1);
  const [favoriteGigsTotalPages, setFavoriteGigsTotalPages] = useState(1);
  const [hostedGigsPage, setHostedGigsPage] = useState(1);
  const [hostedGigsTotalPages, setHostedGigsTotalPages] = useState(1);
  const { favoriteGigs } = useFavorites()

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${id}?favoritePage=${favoriteGigsPage}&hostedPage=${hostedGigsPage}`);
      if (!response.ok) throw new Error(`${response.status}: (${response.statusText})`);
      const body = await response.json();
      setUser((prevUser) => ({
        ...body.user,
        favoriteGigs: favoriteGigs, // Sync with global state
      }));
      setFavoriteGigsTotalPages(body.user.favoriteGigsTotalPages);
      setHostedGigsTotalPages(body.user.hostedGigsTotalPages);
    } catch (error) {
      console.error(`Error in fetch: ${error}`);
    }
  };

  useEffect(() => {
    getUser();
  }, [favoriteGigsPage, hostedGigsPage, favoriteGigs]);

  const handleNextFavoriteGigsPage = () => {
    if (favoriteGigsPage < favoriteGigsTotalPages) setFavoriteGigsPage(favoriteGigsPage + 1);
  };

  const handlePreviousFavoriteGigsPage = () => {
    if (favoriteGigsPage > 1) setFavoriteGigsPage(favoriteGigsPage - 1);
  };

  const handleNextHostedGigsPage = () => {
    if (hostedGigsPage < hostedGigsTotalPages) setHostedGigsPage(hostedGigsPage + 1);
  };

  const handlePreviousHostedGigsPage = () => {
    if (hostedGigsPage > 1) setHostedGigsPage(hostedGigsPage - 1);
  };

  const handleImageUpload = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setNewProfileImage({ image: acceptedFiles[0] });
      setUploadedImage({ preview: URL.createObjectURL(acceptedFiles[0]) });
    }
  };

  const addProfileImage = async (event) => {
    event.preventDefault();
    const imageAddToProfile = new FormData();
    imageAddToProfile.append("image", newProfileImage.image);
    try {
      const response = await fetch(`/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: { "Accept": "image/jpeg" },
        body: imageAddToProfile,
      });
      if (!response.ok) throw new Error(`${response.status} (${response.statusText})`);
      const body = await response.json();
      setUser(body.user);
      setUploadedImage({ preview: "" });
    } catch (error) {
      console.error(`Error in add profile image: ${error.message}`);
    }
  };

  const updateFavorites = (gigId, isFavorite) => {
    setUser(prevUser => {
      const updatedFavorites = isFavorite
        ? [...prevUser.favoriteGigs, { id: gigId }]
        : prevUser.favoriteGigs.filter(gig => gig.id !== gigId);
      return { ...prevUser, favoriteGigs: updatedFavorites };
    });
  };

  const favoriteGigTiles = user.favoriteGigs?.map(gigObject => (
    <GigTile key={gigObject.id} {...gigObject} currentUser={user} updateFavorites={updateFavorites} />
  ));

  const hostedGigTiles = user.hostedGigs?.map(gigObject => (
    <GigTile key={gigObject.id} {...gigObject} currentUser={user} updateFavorites={updateFavorites} />
  ));

  let dropzoneComponent = "";
  let previewComponent = "";

  if (uploadedImage.preview) {
    previewComponent = <img src={uploadedImage.preview} className="profile-image-preview" />;
  }

  let artistInfo;

  if (user.artist && user.artist.length > 0) {
    artistInfo = (
      <div className="shift-down">
        <Link to={`/artists/${user.artist[0].id}`} className="centered">
          <button type="button" className="button">
            {user.artist[0].artistName}'s Artist Page
          </button>
        </Link>
      </div>
    );
  } else if (currentUser?.id === user.id){
    artistInfo = (
      <div className="shift-down">
        <Link to={`/users/${id}/register-as-artist`} className="centered">
          <button type="button" className="button">
            Register As Artist
          </button>
        </Link>
      </div>
    );
  } else {
    artistInfo = <></>
  }
  if (currentUser?.id === user.id) {
    dropzoneComponent = (
      <div className="grid-x dropzone">
        <h3 className="white cell">Upload profile image</h3>
        <form onSubmit={addProfileImage} className="cell">
          {previewComponent}
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input type="file" {...getInputProps()} />
                <p className="button">Add Image</p>
              </div>
            )}
          </Dropzone>
          <button
            type="submit"
            className="button"
            disabled={!uploadedImage.preview}
          >
            Save Profile
          </button>
        </form>
      </div>
    );
  }

  const createdDateString = new Date(user.createdAt).toUTCString();

  return (
    <div className="hero-image centered text-box">
      <div className="grid-x">
        <div className="small-5 scroll bg-clear">
          <h3 className="date-string">{createdDateString}</h3>
          <img src={user.profileImage} className="profile-image" alt="profile-image" />
          <h3 className="username-string">{user.username}</h3>
          <h3 className="email-string">{user.email}</h3>
          {artistInfo}
          {currentUser?.id === user.id &&
          <div className="shift-down">
            <Link to={`/gigs/new-gig-form`} className="centered">
              <button type="button" className="button">
                Host a Gig
              </button>
            </Link>
          </div>}
          {dropzoneComponent}
        </div>

        <div className="small-7 scroll bg-clear">
          {currentUser?.hostedGigs?.length > 0 &&
          <>
            <h1 className="glow small">Hosted Gigs</h1>
            <div className="grid-x">{hostedGigTiles}</div>
            <div className="pagination-controls">
              <button className="pagination-button" onClick={handlePreviousHostedGigsPage} disabled={hostedGigsPage === 1}>Previous</button>
              <span className="pagination-info">Page {hostedGigsPage} of {hostedGigsTotalPages}</span>
              <button className="pagination-button" onClick={handleNextHostedGigsPage} disabled={hostedGigsPage === hostedGigsTotalPages}>Next</button>
            </div>
          
          
          </>
          }

          {favoriteGigs.length > 0 &&
            <>
            <h1 className="glow small">Favorite Gigs</h1>
              <div className="grid-x">{favoriteGigTiles}</div>
              <div className="pagination-controls">
                <button className="pagination-button" onClick={handlePreviousFavoriteGigsPage} disabled={favoriteGigsPage === 1}>Previous</button>
                <span className="pagination-info">Page {favoriteGigsPage} of {favoriteGigsTotalPages}</span>
                <button className="pagination-button" onClick={handleNextFavoriteGigsPage} disabled={favoriteGigsPage === favoriteGigsTotalPages}>Next</button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default UserShowPage;