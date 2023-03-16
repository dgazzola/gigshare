import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GigTile = ({ id, name, city, address, state, startTime, endTime, date, currentUser}) => {
  const gigUrl = `/gigs/${id}`
  const [currentGig, setCurrentGig] = useState({})

  const getGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const parsedResponse = await response.json()
      setCurrentGig(parsedResponse.gig)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  let favoritedIcon

  useEffect(() => {
    getGig()
  }, [])

  if (currentGig.favorited?.length){
    let k = 0
    let length = currentGig.favorited.length
    for (let i=0; i<length; i++){
      if (currentGig.favorited[i].id===currentUser?.id){
        k++
      }
    }
    if (k>0){
      favoritedIcon = <FontAwesomeIcon  key ={`font-awesome ${id}`} icon={faHeart} />
    }
  }

  return(
      <div className="button callout cell tile-box bg-orange">
        <Link to={gigUrl} className = "centered">
        <h4>{name}</h4>
        <p>{city}</p>
        <p>{date}</p>
        {favoritedIcon}
        </Link>
      </div>
  )
}

export default GigTile