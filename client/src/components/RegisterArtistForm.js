import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
import translateServerErrors from "./../services/translateServerErrors.js"
import ErrorList from "./layout/ErrorList.js";
import _ from "lodash"

const RegisterArtistForm = props => {
  const defaultForm = {
    artistName:"",
    genre:"",
    mediaUrl:""
  }
  const [newArtist, setNewArtist] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  let newArtistForm

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
        if (response.status===422){
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
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    registerNewArtist(newArtist)
  }

  const handleInput = event => {
    setNewArtist({
      ...newArtist,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const formInputs = Object.keys(defaultForm).map(input => {
    if (input!=="userId"){
      return (         
        <label key={input}>{_.startCase(input)}:
          <input type="text" name={input} value={newArtist[input]} onChange={handleInput}/>
        </label>
      )      
    }
  })

  if (shouldRedirect) {
    return <Redirect push to={`/users/${props.currentUser.id}`} />
  }

  return (
    <div className="callout">
      <h1>Register Artist Form</h1>
        <form onSubmit={handleSubmit}>
          <ErrorList errors={errors} />
          {formInputs}
          <input type="submit" value="submit" className="button" onClick={handleSubmit}/>
        </form>      
      {newArtistForm}

    </div>

  )
}

export default RegisterArtistForm