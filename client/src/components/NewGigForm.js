import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
import translateServerErrors from "./../services/translateServerErrors.js"
import _ from "lodash"
import ErrorList from "./layout/ErrorList.js";

const NewGigForm = props => {
  const defaultForm = {
    name:"",
    address:"",
    city:"",
    state:"",
    date:"",
    startTime:"",
    endTime:""
  }
  const [newGig, setNewGig] = useState(defaultForm)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  const addNewGig = async () =>{
    try {
      const response = await fetch('/api/v1/gigs', {
        method:"POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newGig)
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
        const body = await response.json()
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    addNewGig()
  }

  const handleInput = event => {
    if (event.currentTarget.name==="date"){
      setNewGig({
        ...newGig,
        date: new Date(event.currentTarget.value).toISOString().slice(0,10)
      })
    } else {
      setNewGig({
        ...newGig,
        [event.currentTarget.name]: event.currentTarget.value,
        hostId:`${props.currentUser?.id}`
      })
    }
  }

  const formInputs = Object.keys(defaultForm).map(input => {
    if (input!=="date" && input!=="startTime"&& input!=="endTime"){
      return(
        <label className="text-white" key={input}>{_.startCase(input)}:
          <input type="text" name={input} value={newGig[input]} onChange={handleInput}/>
        </label>
      )
    }
    if (input==="date"){
      return(

        <label className="text-white" key={input}>{_.startCase(input)}:
          <input type="date" name={input} value={newGig[input]} onChange={handleInput}/>
        </label>
      )
    }
    if (input==="startTime" || input==="endTime"){
      return(

        <label className="text-white" key={input}>{_.startCase(input)}:
          <input type="time" name={input} value={newGig[input]} onChange={handleInput}/>
        </label>
      )
    }
  })

  if (shouldRedirect) {
    return <Redirect push to={`/users/${props.currentUser.id}`} />
  }

  return(
    <div className="centered hero-image">
      <div>
      <h1 className="centered text-white glow small">Submit A Gig!</h1>
      <form onSubmit={handleSubmit} className="form new-gig-form">
        <ErrorList errors={errors} />
        {formInputs}
        <div className="clear"></div>
        <input type="submit" value="Submit Gig" className="button" onClick={handleSubmit}/>
      </form>
      </div>
    </div>
  )
}

export default NewGigForm