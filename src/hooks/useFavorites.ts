import { useEffect, useState } from "react";


const useFavorite = ( launchId: string ): [boolean, () => void] => {

  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorite = favorites.includes(launchId)
    if (isFavorite) {
      setLiked(true);
    }
  }, [ launchId ]);

  const toggleFavorite = () => {
    const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorite = favorites.includes(launchId);

    if (!isFavorite) {
      // Agregar a favoritos
      favorites.push(launchId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setLiked(true);
    } else {
      // Remover de favoritos
      const updatedFavorites = favorites.filter(fav => fav !== launchId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setLiked(false);
    }
  };

  return [ liked , toggleFavorite ];
};

export default useFavorite;
