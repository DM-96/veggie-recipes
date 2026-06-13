import { createContext, useState } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};