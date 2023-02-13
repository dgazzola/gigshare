import React from "react"

const GigTile = ({ name, location, time}) => {

  return(
    <div className="small-6 callout centered">
      <h4>{name}</h4>
      <p>Location: {location}</p>
      <p>Time: {time}</p>
    </div>
  )
}

export default GigTile