import React, { useState, useEffect } from "react"

const GigDelete = ({currentUser, gig, setShouldRedirect}) => {

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
  if(currentUser?.id===gig.hostId){
    return(
      <button type="button" className={`button`} onClick={handleDelete}> Delete Gig</button>
    )
  } else {
    return(null)
  }
}

export default GigDelete