import React, { createContext, useContext, useState, useCallback } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favoriteGigs, setFavoriteGigs] = useState([]);

  const fetchFavorites = useCallback(async (userId) => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/favorites`);
      if (!response.ok) throw new Error("Failed to fetch favorites");
      const data = await response.json();
      setFavoriteGigs(data.user.favorites || []);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const toggleFavorite = async (gigId, isFavorited, userId) => {
    try {
      const method = isFavorited ? "DELETE" : "POST";
      const response = await fetch(`/api/v1/users/${userId}/favorites`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gigId }),
      });

      if (!response.ok) throw new Error("Failed to update favorite status");
      const data = await response.json();
      setFavoriteGigs(data.favorites || []);
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteGigs, fetchFavorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};