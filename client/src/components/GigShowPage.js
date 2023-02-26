import React, { useState, useEffect } from "react"
import ArtistTile from "./ArtistTile.js"
import { Redirect } from "react-router-dom"
import GoogleMap from "./GoogleMap.js"
import GigFavoriteButton from "./GigFavoriteButton.js"


const GigShowPage = (props) => {
  const [gig, setGig] = useState({})
  const [artists, setArtists] = useState({})
  const [updatedGig,setUpdatedGig] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [visibility, setVisibility] = useState("invisible")
  const [dropDown, setDropDown] = useState("")
  const [addArtistDropdown, setAddArtistDropdown] = useState(false)
  const [lineupInfo, setLineupInfo] = useState({})
  const id = props.match.params.id


  const getGig = async() => {
    try {
      const response = await fetch(`/api/v1/gigs/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const gigData = await response.json()
      setGig(gigData.gig)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }

  }
  const getArtists = async () => {
    try {
      const response = await fetch('/api/v1/artists')
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const parsedResponse = await response.json()
      setArtists(parsedResponse.artists)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getGig(),
    getArtists(),
    initMap()
  }, [])

  let artistTileComponents=""
  let lineupMessage = <h1 className="glow small shift-down-small">Lineup TBA</h1>
  if (gig.artists?.length>0){
    lineupMessage = <h1 className="glow small shift-down-small">LineUp:</h1>
    artistTileComponents = gig.artists.map(artistObject => {
      return (
        <ArtistTile
          key={artistObject.id}
          {...artistObject}
        />
      )
    })
  }

  let favoriteCount
  const editGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${gig.id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(updatedGig)
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
  }

  const handleEdit = () => {
    if (visibility){
      setVisibility("")
      setDropDown("drop-down")
    } else {
      setVisibility("invisible")
      setDropDown("")
      window.scrollTo(0,0)
    }
  }

  const handleInputChange = event => {
    setUpdatedGig({
      ...updatedGig,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleUpdate = event => {
    event.preventDefault()
    if (!updatedGig.name && !updatedGig.startTime && !updatedGig.endTime && !updatedGig.date && !updatedGig.city && !updatedGig.address && !updatedGig.state){
      handleEdit()
      alert(`No changes have been submitted for ${gig.name}!`)
    } else {
      editGig()
    }
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${gig.name}? \nThis cannot be undone`) == true) {
      deleteGig()
    } else {
      alert(`${gig.name} has NOT been deleted.`)
    }
  }
  
  const deleteGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${gig.id}`, {
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

  let deleteGigButton=""
  let signArtistToLineupDropdown=""
  let editGigForm=""
  let artistDropdown

  const toggleAddArtistDropdown = event => {
    if (addArtistDropdown){
      setAddArtistDropdown(false)
    }
    if (!addArtistDropdown){
      setAddArtistDropdown(true)
    }
  }
  if (addArtistDropdown){
    let artistOptionsArray=[]
    for (let i=0; i<artists.length; i++){
      artistOptionsArray.push(<option key={artists[i].artistName} value={artists[i].id}>{artists[i].artistName}</option>)
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

    const artistFormSelect = event => {
      setLineupInfo({
        gigId: `${gig.id}`,
        artistId:event.currentTarget.value
      })
    }
    
    artistDropdown =
      <div className="shift-down">
        <form onSubmit={updateLineup}>
          <select onChange={artistFormSelect}>
            <option></option>
            {artistOptionsArray}
          </select>   
          <input type="submit" value="Submit" className="button" />    
        </form>
      </div>
  }
  if (!addArtistDropdown){
    artistDropdown=""
  }

  if (props.currentUser?.id===gig.hostId){
    editGigForm = 
    <div>
      <button type="button" className="button shift-down" onClick={handleEdit}>
        Edit
      </button>
      <div className={`info-wrap ${visibility}`}>
        <button type="button" className={`button shift-down ${visibility}`} onClick={toggleAddArtistDropdown}>
          Add Artist
        </button>
        {artistDropdown}
        <form onSubmit={handleUpdate} className="form-smaller">
          <label className="text-white">
              Update Gig Name:
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={updatedGig.name}
              />
          </label>
          <label className="text-white">
              Update Gig Date:
              <input
                type="date"
                name="date"
                onChange={handleInputChange}
                value={updatedGig.date}
              />
          </label>
          <label className="text-white">
              Update Gig Address:
              <input
                type="text"
                name="address"
                onChange={handleInputChange}
                value={updatedGig.address}
              />
          </label>
          <label className="text-white">
              Update Gig City:
              <input
                type="text"
                name="city"
                onChange={handleInputChange}
                value={updatedGig.city}
              />
          </label>
          <label className="text-white">
              Update Gig State:
              <input
                type="text"
                name="state"
                onChange={handleInputChange}
                value={updatedGig.state}
              />
          </label>
          <label className="text-white">
              Update Gig Start Time:
              <input
                type="time"
                name="startTime"
                onChange={handleInputChange}
                value={updatedGig.startTime}
              />
          </label>
          <label className="text-white">
              Update Gig End Time:
              <input
                type="time"
                name="endTime"
                onChange={handleInputChange}
                value={updatedGig.endTime}
              />
          </label>
        
          <div className="button-group centered">
            <input className="button" type="submit" value="Update Gig" />
          </div>
        </form>
      </div>

    </div>
    deleteGigButton=<button type="button" className={`button ${visibility}`} onClick={handleDelete}> Delete Gig</button>
  }

  const handleFavoriteButton = async () =>{
    if (gig.isUserFavorite){
      try {
        const response = await fetch(`/api/v1/gigs/${gig.id}/favorites`, {
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
        }
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
    if (!gig.isUserFavorite){
      try {
        const response = await fetch(`/api/v1/gigs/${gig.id}/favorites`, {
          method: "POST",
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
        }
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
    getGig()
  }

  let favoritedCountDisplay=""

  if (gig?.favorited?.length){
    favoriteCount = gig.favorited.length
    favoritedCountDisplay="Favorited:"
  }

  if (shouldRedirect){
    return <Redirect push to ={`/users/${props.currentUser.id}`} />
  }

  return (
    <div className="centered text-white">
      <div className="hero-image">
        <div className="info-wrap">
      <h1 className="glow small shift-down-small">{gig.name}</h1>
      <h2 className="text-white">{gig.city}, {gig.state}</h2>
      <h2 className="text-white">{gig.date}</h2>
      <h2 className="text-white">{gig.startTime}-{gig.endTime}</h2>
      <h2 className="text-white">{favoritedCountDisplay} {favoriteCount}</h2>
      <GigFavoriteButton currentUser={props.currentUser} gig={gig} handleFavoriteButton={handleFavoriteButton} getGig={getGig}/>
        </div>
      {lineupMessage}
      <div className="centered grid-x">
      {artistTileComponents}
      </div>
      {signArtistToLineupDropdown}
      {editGigForm}
      {deleteGigButton}
      </div>
      <GoogleMap gig={gig} dropDown={dropDown}/>

    </div>
  )
}

export default GigShowPage