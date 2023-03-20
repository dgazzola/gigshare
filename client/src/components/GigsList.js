import React, { useState, useEffect } from "react"
import GigTile from "./GigTile.js"
import SearchBar from "../services/SearchBar.js"
import GigSortDropdown from "./GigSortDropdown.js"

const GigsListPage = (props) => {
  const [gigs, setGigs] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [filterFunction, setFilterFunction] = useState("")
    
  const sortAlphabeticallyAscending = (a,b) => {
    if (a?.name<b?.name){
      return -1
    }
    if (a?.name>b?.name){
      return 1
    }
    return 0
  }
  
  const sortAlphabeticallyDescending = (a,b) => {
    if (a?.name>b?.name){
      return -1
    }
    if (a?.name<b?.name){
      return 1
    }
    return 0
  }
  
  const createdAt = (a,b) => {
    if (a?.createdAt>b?.createdAt){
      return -1
    }
    if (a?.createdAt<b?.createdAt){
      return 1
    }
    return 0
  }

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
  },[])

  let sortedTileComponents
  if (!filterFunction){
    const sortedGigs = gigs.sort( createdAt )
    console.log(sortedGigs)
    sortedTileComponents =sortedGigs.map(gigObject => {
      return (
        <GigTile
          key={gigObject.id}
          {...gigObject}
          currentUser={props.currentUser}
        />
      )    
    })
  }
  if (filterFunction==="alphabeticallyAscending"){
    const sortedGigs = gigs.sort( sortAlphabeticallyAscending )
    sortedTileComponents = sortedGigs.map(gigObject => {
      return (
        <GigTile
          key={gigObject.id}
          {...gigObject}
          currentUser={props.currentUser}
        />
      )    
    })
  }
  if (filterFunction==="alphabeticallyDescending"){
    const sortedGigs = gigs.sort( sortAlphabeticallyDescending )
    sortedTileComponents = sortedGigs.map(gigObject => {
      return (
        <GigTile
          key={gigObject.id}
          {...gigObject}
          currentUser={props.currentUser}
        />
      )    
    })
  }

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
      <br/>
      {searchTileComponents}
        </div>
        <div className="small-7 scroll callout bg-clear">
          <GigSortDropdown gigs={gigs} setGigs={setGigs} setFilterFunction={setFilterFunction}/>
          <div className="grid-x">

        {sortedTileComponents}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GigsListPage