import { useEffect, useState } from "react";

// Custom hook to manage favorite launches based on launch ID
const useFavorite = ( launchId: string ): [boolean, () => void] => {

  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    // Get favorites from local storage and parse them into an array
    const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    // Check if the current launch ID is in the favorites array
    const isFavorite = favorites.includes(launchId)
    if (isFavorite) {
       // Set liked to true if it is a favorite
      setLiked(true);
    }
  }, [ launchId ]);

   // Function to toggle the favorite status of the launch
  const toggleFavorite = () => {
    // Get favorites from local storage
    const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    // Check if the current launch ID is already a favorite
    const isFavorite = favorites.includes(launchId);

    if (!isFavorite) {
      // If it's not a favorite, add it to the favorites array
      favorites.push(launchId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setLiked(true);
    } else {
      // If it is a favorite, remove it from the favorites array
      const updatedFavorites = favorites.filter(fav => fav !== launchId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setLiked(false);
    }
  };
  // Return the liked state and the toggle function
  return [ liked , toggleFavorite ];
};

export default useFavorite;
