import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import GigTile from "./GigTile.js"

const GigsListPage = () => {
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

  const gigTileComponenets = gigs.map(gigObject => {
    return (
      <GigTile
        key={gigObject.id}
        {...gigObject}
      />
    )
  })

  return (
    <div>
      <h2 className="centered">Upcoming Gigs</h2>
      <div className="grid-x">
        {gigTileComponenets}
      </div>
      <Link to="/gigs/new-gig-form" className="button">Share a Gig!</Link>
    </div>
  )
}

export default GigsListPage