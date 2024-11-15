// const GigFavoriteButton = ({ gigId, favoriteGigs, updateFavoriteGigs, currentUser }) => {
//   // THIS NEEDS WORK/BRAINSTORMING!!!
//   const [isFilled, setIsFilled] = useState(false);

//   useEffect(() => {
//     setIsFilled(favoriteGigs.some((gig) => gig.id === gigId));
//   }, [favoriteGigs, gigId]);

//   const handleFavoriteClick = async () => {
//     try {
//       const response = await fetch(`/api/v1/users/${currentUser.id}/favorites`, {
//         method: isFilled ? "DELETE" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ gigId }),
//       });

//       if (!response.ok) throw new Error("Failed to update favorite status");

//       const data = await response.json();
//       updateFavoriteGigs(data.favorites);
//     } catch (error) {
//       console.error("Error updating favorite:", error);
//     }
//   };

//   return (
//     <IconButton
//       onClick={(e) => {
//         e.stopPropagation();
//         handleFavoriteClick();
//       }}
//     >
//       {isFilled ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//     </IconButton>
//   );
// };

import React from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useFavorites } from "../context/FavoritesContext";

const GigFavoriteButton = ({ gigId, currentUser }) => {
  const { favoriteGigs, toggleFavorite } = useFavorites();
  const isFavorited = favoriteGigs.some((gig) => gig.id === gigId);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent bubbling
    if (currentUser) {
      toggleFavorite(gigId, isFavorited, currentUser.id);
    } else {
      alert("Please sign in to favorite gigs!");
    }
  };

  return (
    <IconButton onClick={handleFavoriteClick}>
      {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default GigFavoriteButton;
