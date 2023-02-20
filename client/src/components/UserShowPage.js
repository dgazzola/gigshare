import React, { useState } from 'react';
import { Link } from "react-router-dom"
import GigTile from './GigTile.js';

const UserShowPage = (props) => {
  const { id } = props.match.params
  const [user, setUser] = useState({
    artist:"",
    favoriteGigs:""
  })

  const currentUser = props.currentUser

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

  let artistInfo ="replace with user artist button"

  if (user.artist.length!==0){
    artistInfo =
    <div className="shift-down">
        <Link to={`/artists/${user.artist[0].id}`} className="centered">
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

  let gigTileComponents
  let gigMessage = <h1 className="glow small shift-down"> No Favorited Gigs</h1>

  if(user.favoriteGigs.length) {
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

  const DateObject = new Date(user.createdAt)
  const createdDateString= DateObject.toUTCString()

  return(
    <div className="centered text-box">
      <h3 className="text-white ">Username: {user.username}</h3>
      <h3 className="text-white ">Email: {user.email}</h3>
      <h3 className="text-white ">Created At: {createdDateString}</h3>
      {artistInfo}
      <div className="centered shift-down">
        {gigMessage}
        {gigTileComponents}
      </div>

    </div>
  )
}

export default UserShowPage