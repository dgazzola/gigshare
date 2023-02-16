import React, { useState } from 'react';
import { Link } from "react-router-dom"

const UserShowPage = (props) => {
  const { id } = props.match.params
  const [user, setUser] = useState({
    artist:""
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
    getUser()
  }, [])

  let artistInfo ="replace with user artist button"
  //need to redirect to artist show page /artists/artistId, which is set by accessing users nested artist value
  if (user.artist.length!==0){
    console.log("USER ARTIST", user.artist[0])
    console.log("USER ARTIST ID FOR REDIRECT", user.artist[0].id)
    artistInfo = <div>
        <Link to={`/artists/${user.artist[0].id}`} className="centered">
          <button type="button" className="button">
            {user.artist[0].artistName}'s Artist Page
          </button>
        </Link>
      </div>
  }

  if (user.artist.length===0){
    artistInfo=<button type="button" className="button">
      <Link to={`/users/${id}/register-as-artist`}>
      Register as Artist
      </Link>
      </button>
  }

  const DateObject = new Date(user.createdAt)
  const createdDateString= DateObject.toUTCString()

  return(
    <div className="centered text-box">
      <h3>Username: {user.username}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Created At: {createdDateString}</h3>
      {artistInfo}
    </div>
  )
}

export default UserShowPage