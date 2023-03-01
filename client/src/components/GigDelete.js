import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const GigDelete = ({currentUser, gig}) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${gig.name}? \nThis cannot be undone`) == true) {
      deleteGig()
    } else {
      alert(`${gig.name} has NOT been deleted.`)
    }
  }

  const deleteGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${gig?.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(gig)
      })
      if (!response.ok) {
        if (response.status===422) {
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
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect){
    return <Redirect push to ={`/users/${currentUser.id}`} />
  }

  if(currentUser?.id===gig.hostId){
    return(
      <button type="button" className={`button right-forty`} onClick={handleDelete}> Delete Gig</button>
    )
  } else {
    return(null)
  }
}

export default GigDelete