import React from "react"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="hero-image">
      <div className="hero-text">
        <h1 className="header">GIGSHARE</h1>
          <div className="text-wrap">
            <h4> helping artists and fans connect about upcoming shows</h4>
          </div>
        <Link to="/gigs">
        <button className="button big shift-down">See Gigs</button>
        </Link>
      </div>
    </div>
    

  )
}

export default HomePage