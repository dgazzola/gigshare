import React, { useState, useEffect } from "react"
import GigTile from "./GigTile.js"
import SearchBar from "../services/SearchBar.js"
import GigSortDropdown from "./GigSortDropdown.js"
import ToggleGroup from "./ToggleGroup.js"

const GigsListPage = (props) => {
  const [gigs, setGigs] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [filterFunction, setFilterFunction] = useState("")
  const [selectedComponent, setSelectedComponent] = useState("allGigs")
    
  const sortAlphabeticallyAscending = (a,b) => {
    if (a?.name.toLowerCase()<b?.name.toLowerCase()){
      return -1
    }
    if (a?.name.toLowerCase()>b?.name.toLowerCase()){
      return 1
    }
    return 0
  }
  
  const sortAlphabeticallyDescending = (a,b) => {
    if (a?.name.toLowerCase()>b?.name.toLowerCase()){
      return -1
    }
    if (a?.name.toLowerCase()<b?.name.toLowerCase()){
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

  const sortChronologicallyClosest = (a,b) => {
    const dateA = new Date(`${a?.date[6]+a?.date[7]+a?.date[8]+a?.date[9]}-${a?.date[0]+a?.date[1]}-${a?.date[3]+a?.date[4]}`)
    const dateB = new Date(`${b?.date[6]+b?.date[7]+b?.date[8]+b?.date[9]}-${b?.date[0]+b?.date[1]}-${b?.date[3]+b?.date[4]}`)
    if (dateA>dateB){
      return 1
    }
    if (dateA<dateB){
      return -1
    }
    return 0
  }
  
  const sortChronologicallyFurthest = (a,b) => {
    const dateA = new Date(`${a?.date[6]+a?.date[7]+a?.date[8]+a?.date[9]}-${a?.date[0]+a?.date[1]}-${a?.date[3]+a?.date[4]}`)
    const dateB = new Date(`${b?.date[6]+b?.date[7]+b?.date[8]+b?.date[9]}-${b?.date[0]+b?.date[1]}-${b?.date[3]+b?.date[4]}`)
    if (dateA>dateB){
      return -1
    }
    if (dateA<dateB){
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
      console.log('setting gigs:', parsedResponse.gigs)
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
  if (filterFunction==="chronologicallyClosest"){
    const sortedGigs = gigs.sort( sortChronologicallyClosest )
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
  if (filterFunction==="chronologicallyFurthest"){
    const sortedGigs = gigs.sort( sortChronologicallyFurthest )
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
        <div className="small-2 bg-clear scroll" style={{  flexDirection: 'column', alignItems: 'center' }}>
          <ToggleGroup setSelectedComponent={setSelectedComponent} selectedComponent={selectedComponent} />
  
          {selectedComponent === "allGigs" && (
            <div style={{ maxWidth: '70%', margin: '0 auto' }}>

              <GigSortDropdown gigs={gigs} setGigs={setGigs} setFilterFunction={setFilterFunction} />
              <div className="grid-x grid-padding-x" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {sortedTileComponents}
              </div>
            </div>
          )}
          {selectedComponent === "searchGigs" && (
            <div style={{ maxWidth: '70%', margin: '0 auto' }}>
              <SearchBar gigs={gigs} setSearchResults={setSearchResults} />
              <div className="grid-x grid-padding-x" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {searchTileComponents}
              </div>
            </div>
          )}
        </div>
    </div>
  );
}

export default GigsListPage