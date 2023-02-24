import React from "react"

const GigFavoriteButton = ({ currentUser, gig, handleFavoriteButton}) => {
  let favoriteMessage

  if (gig.isUserFavorite) {
    favoriteMessage = "Unfavorite"
  } else {
    favoriteMessage = "Favorite"
  }

  if(currentUser?.id){
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