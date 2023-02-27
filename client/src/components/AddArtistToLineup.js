import React, { useState, useEffect } from "react"

const AddArtistToLineupButton = ({ gig, artists }) => {
  const [showLineupDropdown, setShowLineupDropdown] = useState(false)
  const [lineupInfo, setLineupInfo] = useState({})

  const artistFormSelect = event => {
    setLineupInfo({
      gigId: `${gig.id}`,
      artistId:event.currentTarget.value
    })
  }

  let artistDropdown

  const handleToggle = event => {
    if (showLineupDropdown){
      setShowLineupDropdown(false)
    } else {
      setShowLineupDropdown(true)
    }
  }

  const updateLineup = async () => {
    let shouldUpdate = true
    for (let i = 0; i<gig.artists?.length; i++){
      if (gig.artists[i].id===lineupInfo.artistId){
        shouldUpdate=false
      }
    }
    if (shouldUpdate){
      try {
        const response = await fetch(`/api/v1/gigs/${gig.id}/lineups`, {
          method: "PATCH",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(lineupInfo)
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
          const returnedGig = body.gig   
          setShouldRedirect(true)      
          setGig(returnedGig)
        }
      } catch(err) {
      }
    } else {
      alert(`Artist is already in lineup!`)
    }
  }

  if (showLineupDropdown) {
    let artistOptionsArray=[]
    for (let i=0; i<artists?.length; i++){
      artistOptionsArray.push(<option key={artists[i].artistName} value={artists[i].id}>{artists[i].artistName}</option>)
    }
    artistDropdown =
    <div className="info-wrap">
      <form onSubmit={updateLineup}>
        <label className="text-white">
          Select Artist:
        <select onChange={artistFormSelect}>
          <option></option>
          {artistOptionsArray}
        </select>   
        </label>
        <input type="submit" value="Submit" className="button inline" />    
      </form>
    </div>
  } else {
    artistDropdown=null
  }

  return (
    <div>
      <button type="button" className={`button`} onClick={handleToggle}>
        Add Artist
      </button>
      {artistDropdown}

    </div>
  )
}

export default AddArtistToLineupButton