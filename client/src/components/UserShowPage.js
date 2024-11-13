import React, { useState } from 'react'
import { Link } from "react-router-dom"
import GigTile from './GigTile.js'
import Dropzone from "react-dropzone"

console.log("Component is rendering");  // Add this outside of functions


const UserShowPage = (props) => {
  const { id } = props.match.params
  const currentUser = props.currentUser
  const [user, setUser] = useState({
    artist:[],
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

  const handleImageUpload = (acceptedFiles) => {
    // Check if files were accepted
    if (acceptedFiles && acceptedFiles[0]) {
      setNewProfileImage({
        image: acceptedFiles[0]
      });
      setUploadedImage({
        preview: URL.createObjectURL(acceptedFiles[0])
      });
    }
    console.log("File uploaded:", acceptedFiles[0]);
    console.log('preview set to:', uploadedImage.preview)
  };
  

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
      setUser(body.user)

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

  let artistInfo ="replace with user artist button" // can handle this better

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
      <div className="grid-x dropzone">
        <h3 className='white cell'>Upload profile image</h3>
        <form onSubmit={addProfileImage} className='cell'>
          {previewComponent} {/* Show image preview if available */}
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
            disabled={!uploadedImage.preview} // Disable if no image is selected
          >
            Save Profile
          </button>
        </form>
      </div>
    )
  }

  let gigTileComponents
  let gigMessage = <h1 className="glow small shift-down"> No Favorited Gigs</h1>

  if(user.favoriteGigs?.length) {
    gigMessage = <h1 className="glow small"> Favorited Gigs</h1>
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
  let hostedMessage =  <h1 className="glow small shift-down"> No Hosted Gigs</h1>
  let hostedGigTiles
  if (user.hostedGigs?.length){
    hostedMessage = <h1 className="glow small"> Hosted Gigs</h1>
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

  const DateObject = new Date(user.createdAt)
  const createdDateString= DateObject.toUTCString()

  return(
    <div className="hero-image centered text-box">



<div className='grid-x'>
  
    <div className="small-5 scroll bg-clear">
        <h3 className="date-string">{createdDateString}</h3>
        <img src={user.profileImage} className='profile-image' alt='profile-image' />
        <h3 className="username-string">{user.username}</h3>
        <h3 className="email-string">{user.email}</h3>
        {artistInfo}
        { currentUser?.id === user.id &&
          <Link to={`/gigs/new-gig-form`} className="centered">
            <button type="button" className="shift-down button">
              Register Gig
            </button>
          </Link>
        }
        {dropzoneComponent}
    </div>
    

        <div className="scroll small-7 bg-clear">
          <div className='bg-clear'>

        {hostedMessage}
          <div className='grid-x'>
        {hostedGigTiles}
          </div>
          </div>


        <div className="scroll small-7 bg-clear">
        {gigMessage}
          <div className='grid-x'>
        {gigTileComponents}
          </div>
        </div>


        </div>

</div>
    </div>
  )
}

export default UserShowPage