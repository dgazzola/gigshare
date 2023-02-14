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
      console.log(body)
      } catch (error) {
      console.error(`error in fetch: ${error}`)
    }
  }

  useState(() => {
    getUser()
  }, [])
  let artistInfo ="Replace with artist info/link to artist profile page?"

  if (user.artist.length===0){
    console.log("HIT ARTIST SECTION", user)
    artistInfo=<button type="button" className="button">Register as Artist</button>
  }

  const DateObject = new Date(user.createdAt)
  const createdDateString= DateObject.toUTCString()

  return(
    <div className="centered">
      <h1>Username: {user.username}</h1>
      <h2>Email: {user.email}</h2>
      <h3>Created At: {createdDateString}</h3>
      {artistInfo}
    </div>
  )
}

export default UserShowPage