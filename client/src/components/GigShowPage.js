import React, { useState, useEffect } from "react"

const GigShowPage = (props) => {
  const [gig, setGig] = useState({})
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

  useEffect(() => {
    getGig(),
    console.log(id)
  }, [])

  return(
    <div>
      <h1>individual gig show page!</h1>
      <h2>GIG NAME: {gig.name}</h2>
    </div>
  )
}

export default GigShowPage