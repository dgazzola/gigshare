import React, { useState, useEffect } from "react"

const GigFavoriteButton = ({ currentUser, gig, handleFavoriteButton}) => {

  // let favoriteCount
  // let favoritedCountDisplay
  let favoriteMessage

  if (gig.isUserFavorite) {
    favoriteMessage = "Unfavorite"
  } else {
    favoriteMessage = "Favorite"
  }

  if(currentUser?.id){
    // if (gig.favorited?.length){
    //   favoriteCount = gig.favorited.length
    //   favoritedCountDisplay="Favorited:"
    // }
    return (
      
      <button type="button" className="button" onClick={handleFavoriteButton}>{favoriteMessage}</button>
    )  
  } else {
    return (
      ""
    )
  }

}

export default GigFavoriteButton