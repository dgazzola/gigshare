import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import GigTile from "./GigTile.js"

const GigsListPage = (props) => {
  const [gigs, setGigs] = useState([])

  const getGigs = async () => {
    try {
      const response = await fetch('/api/v1/gigs')
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const parsedResponse = await response.json()
      setGigs(parsedResponse.gigs)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getGigs()
  }, [])

  const gigTileComponents = gigs.map(gigObject => {
    return (
      <GigTile
        key={gigObject.id}
        {...gigObject}
        currentUser={props.currentUser}
      />
    )
  })

  return (
    <div className="">
      <div className="hero-image">
        <h1 className="glow small shift-down-small">Upcoming Gigs</h1>
      <div className="grid-x">
        {gigTileComponents}
      </div>
      </div>
    </div>
  )
}

export default GigsListPage