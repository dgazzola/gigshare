import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import GigTile from "./GigTile.js"
import SearchBar from "../services/SearchBar.js"

const GigsListPage = (props) => {
  const [gigs, setGigs] = useState([])
  const [searchResults, setSearchResults] = useState([])

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

  const searchTileComponents = searchResults.map(gigObject => {
    return (
      <GigTile
      key={gigObject.id}
      {...gigObject}
      currentUser={props.currentUser}
    />
    )
  })

  return (
    <div className="hero-image bg-clear">
      <div className="grid-x">
        <div className="small-5 callout bg-clear scroll">
      <SearchBar gigs={gigs} setSearchResults={setSearchResults}/>
      {searchTileComponents}
        </div>
        <div className="small-7 scroll callout bg-clear">
          <h1 className="centered">Filtered By :</h1>
          <div className="grid-x">

        {gigTileComponents}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GigsListPage