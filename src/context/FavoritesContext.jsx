import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('islandExplorerFavorites', []);

  const toggleFavorite = (islandId) => {
    setFavorites(prev => 
      prev.includes(islandId) 
        ? prev.filter(id => id !== islandId)
        : [...prev, islandId]
    );
  };

  const isFavorite = (islandId) => favorites.includes(islandId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
