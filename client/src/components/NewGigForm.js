import React, { useState } from "react";
import { Redirect } from "react-router-dom"
import translateServerErrors from "./../services/translateServerErrors.js"
import _ from "lodash"

const NewGigForm = props => {
  const defaultForm = {
    name:"",
    location:"",
    date:"",
    time:""
  }
  const [newGig, setNewGig] = useState(defaultForm)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState([])

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
    setNewGig({
      ...newGig,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const formInputs = Object.keys(defaultForm).map(input => {
    if (input!=="date" && input!=="time"){
      return(
        <label key={input}>{_.startCase(input)}:
          <input type="text" name={input} value={newGig[input]} onChange={handleInput}/>
        </label>
      )
    }
    if (input==="date"){
      return(
        <label key={input}>{_.startCase(input)}:
          <input type="date" name={input} value={newGig[input]} onChange={handleInput}/>
        </label>
      )
    }
    if (input==="time"){
      return(
        <label key={input}>{_.startCase(input)}:
          <input type="time" name={input} value={newGig[input]} onChange={handleInput}/>
        </label>
      )
    }
  })

  if (shouldRedirect) {
    return <Redirect push to="/"/>
  }

  return(
    <div>
      <h1 className="centered">Submit An Upcoming Gig!</h1>
      <form onSubmit={handleSubmit}>
        {formInputs}
        <input type="submit" value="Submit Gig" className="button" onClick={handleSubmit}/>
      </form>
    </div>
  )
}

export default NewGigForm

