import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
import translateServerErrors from "./../services/translateServerErrors.js"
import ErrorList from "./layout/ErrorList.js";
import _ from "lodash"

const NewArtistForm = ({ registerNewArtist }) => {
  const defaultForm = {
    artistName:"",
    genre:"",
    mediaUrl:""
  }
  const [errors, setErrors] = useState({})
  const [newArtist, setNewArtist] = useState(defaultForm)

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
        <label className="text-white" key={input}>{_.startCase(input)}:
          <input type="text" name={input} value={newArtist[input]} onChange={handleInput}/>
        </label>
      )      
    }
  })

  return (
    <div className="info-wrap">

    <form onSubmit={handleSubmit}>
    <ErrorList errors={errors} />
    {formInputs}
    <input type="submit" value="submit" className="button" onClick={handleSubmit}/>
  </form>
    </div>
  )
}

export default NewArtistForm