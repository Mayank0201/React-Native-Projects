import { createContext, ReactNode, useState } from "react";

// children must be typed to allow react components inside provider
type ProviderProps = {
  children: ReactNode;
};

// added explicit types to match the context structure
export const FavoritesContext = createContext({
  ids: [] as string[],
  addFavorite: (id: string) => {},
  removeFavorite: (id: string) => {},
});

function FavoritesContextProvider({ children }: ProviderProps) {
  const [favoriteMealIds, setFavoriteIds] = useState<string[]>([]);

  function addFavorite(id: string) {
    setFavoriteIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id: string) {
    setFavoriteIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId != id)
    );
  }

  const values = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    // fixed missing provider value
    <FavoritesContext.Provider value={values}>
      {children}
      {/* We use this so that we can use React Componenets inside it */}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
