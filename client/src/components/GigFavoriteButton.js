const GigFavoriteButton = ({ gigId, favoriteGigs, updateFavoriteGigs, currentUser }) => {
  // THIS NEEDS WORK/BRAINSTORMING!!!
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled(favoriteGigs.some((gig) => gig.id === gigId));
  }, [favoriteGigs, gigId]);

  const handleFavoriteClick = async () => {
    try {
      const response = await fetch(`/api/v1/users/${currentUser.id}/favorites`, {
        method: isFilled ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gigId }),
      });

      if (!response.ok) throw new Error("Failed to update favorite status");

      const data = await response.json();
      updateFavoriteGigs(data.favorites);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        handleFavoriteClick();
      }}
    >
      {isFilled ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
