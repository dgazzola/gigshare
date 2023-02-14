import React from "react"
import { Link } from "react-router-dom"

const HomePage = () => {
  const logTest=(event)=>{
    event.preventDefault()
    console.log("BUTTON IS WORKING")
  }
  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1 className="huge glow">GIGSHARE</h1>
        <Link to="/gigs">
        <button className="button big shift-down">See Gigs</button>
        </Link>
      </div>
    </div>
    

  )
}

export default HomePage
