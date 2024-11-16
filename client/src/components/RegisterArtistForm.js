import React, { useState } from "react";
import { Redirect } from "react-router-dom"
import translateServerErrors from "./../services/translateServerErrors.js"
import ErrorList from "./layout/ErrorList.js";
import _ from "lodash"
import NewArtistForm from "./NewArtistForm.js";

const RegisterArtistForm = props => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  const registerNewArtist = async (newArtistData) => {
    const userId = props.currentUser?.id
    try {
      const response = await fetch(`/api/v1/users/${userId}/register-as-artist`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newArtistData)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  

  if (shouldRedirect) {
    return <Redirect push to={`/users/${props.currentUser.id}`} />
  }

  return (
    <div className="text-white hero-image centered">
      <div>
        <h1 className = "glow small">Register Artist</h1>
        <ErrorList errors={errors} />
        <NewArtistForm registerNewArtist={registerNewArtist} className="centered" />
      </div>
    </div>

  )
}

export default RegisterArtistForm