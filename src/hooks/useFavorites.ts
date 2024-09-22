import { useEffect, useState } from "react";



const useFavorite = (launch: string): [boolean, () => void] => {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const favorites: string= JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorite = favorites.find(fav => fav.flight_number === launch.flight_number);
    if (isFavorite) {
      setLiked(true);
    }
  }, [launch]);

  const toggleFavorite = () => {
    const favorites: string= JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorite = favorites.find(fav => fav.flight_number === launch.flight_number);

    if (!isFavorite) {
      // Agregar a favoritos
      favorites.push(launch);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setLiked(true);
    } else {
      // Remover de favoritos
      const updatedFavorites = favorites.filter(fav => fav.flight_number !== launch.flight_number);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setLiked(false);
    }
  };

  return [liked, toggleFavorite];
};

export default useFavorite;
