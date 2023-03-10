import React, { useState } from 'react'
import { Link } from "react-router-dom"
import GigTile from './GigTile.js'
import Dropzone from "react-dropzone"

const UserShowPage = (props) => {
  const { id } = props.match.params
  const currentUser = props.currentUser
  const [user, setUser] = useState({
    artist:"",
    favoriteGigs:"",
    profileImage:""
  })
  const [newProfileImage, setNewProfileImage] = useState({
    image: {}
  })
  const [uploadedImage, setUploadedImage] = useState({
    preview: ""
  })

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${id}`)
      if(!response.ok) {
        const errorMessage = `${response.status}: (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setUser(body.user)
      } catch (error) {
      console.error(`error in fetch: ${error}`)
    }
  }

  useState(() => {
    window.scrollTo(0,0),
    getUser()
  }, [])
  
  const handleImageUpload = (acceptedImage) => {
    setNewProfileImage({
      ...newProfileImage,
      image: acceptedImage[0]
    })

    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0])
    })
  }

  const addProfileImage = async (event) => {
    event.preventDefault()
    const imageAddToProfile = new FormData()
    imageAddToProfile.append("image", newProfileImage.image)
    try {
      const response = await fetch(`/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
        "Accept": "image/jpeg"
        },
        body: imageAddToProfile
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setUser(body.serializedUser)
      setUploadedImage({
        preview: ""
      })
    } catch (error) {
      console.error(`Error in add profile image: ${error.message}`)
    }
  }
  let dropzoneComponent = ""
  let previewComponent = ""

  if (uploadedImage.preview) {
    previewComponent = <img src={uploadedImage.preview} className="profile-image-preview" />
  }

  let artistInfo ="replace with user artist button"

  if (user.artist.length!==0){
    artistInfo =
    <div className="shift-down">
        <Link to={`/artists/${user?.artist[0].id}`} className="centered">
          <button type="button" className="button">
            {user.artist[0].artistName}'s Artist Page
          </button>
        </Link>
      </div>
  }

  if (user.artist.length===0){
    artistInfo =
    <div className="shift-down">
      <Link to={`/users/${id}/register-as-artist`} className="centered">
        <button type="button" className="button">
          Register As Artist
        </button>
      </Link>
    </div>
  }


  if(currentUser?.id === user.id){
    dropzoneComponent = (
      <div className="dropzone white-bg">
        <h3>Click below to upload image</h3>
        <form onSubmit={addProfileImage}>
          <Dropzone onDrop={handleImageUpload}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input type="text" {...getInputProps()} />
                  <p className = "centered">Input your profile image here</p>
                </div>
              </section>
            )}
          </Dropzone>
          <input className='button' type='submit' value='save profile' />
        </form>
        {previewComponent}
      </div>
    )
  }

  let gigTileComponents
  let gigMessage = <h1 className="glow small shift-down"> No Favorited Gigs</h1>

  if(user.favoriteGigs?.length) {
    gigMessage = <h1 className="glow small"> Favorited Gigs:</h1>
    gigTileComponents = user.favoriteGigs.map(gigObject => {
      return (
        <GigTile
          key={gigObject.id}
          {...gigObject}
          currentUser={user}
        />
      )
    })
  }
  let hostedMessage =  <h1 className="glow small shift-down"> No Favorited Gigs</h1>
  let hostedGigTiles
  if (user.hostedGigs?.length){
    hostedMessage = <h1 className="glow small"> Hosted Gigs:</h1>
    hostedGigTiles = user.hostedGigs.map(gigObject => {
      return (
        <GigTile
          key={gigObject.id}
          {...gigObject}
          currentUser={user}
        />
      )
    })  
  }
  let gigFormButton = <Link to={`/gigs/new-gig-form`} className="centered">
                        <button type="button" className="shift-down button">
                          Register Gig
                        </button>
                      </Link>

  const DateObject = new Date(user.createdAt)
  const createdDateString= DateObject.toUTCString()

  return(
    <div className="centered text-box hero-image-3">
      <h3 className="text-white glow small username-string">{user.username}</h3>
      <div className='info-wrap'>

      <h3 className="text-white email-string">{user.email}</h3>
      <h3 className="text-white date-string">{createdDateString}</h3>
      <img src={user.profileImage} className='profile-image' alt='profile-image' />
      {dropzoneComponent}
      </div>
        {artistInfo}
        {gigFormButton}
        {hostedMessage}
        <div className="grid-x">

        {hostedGigTiles}
        </div>
      <div className="centered">
        {gigMessage}
        <div className="grid-x">
        {gigTileComponents}
        </div>
      </div>

    </div>
  )
}

export default UserShowPage