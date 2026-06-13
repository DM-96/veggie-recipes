import { useContext } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import { RecipeContext } from "../context/RecipeContext";

const Home = () => {
  const { recipes, loading, error } =
    useContext(RecipeContext);

  return (
    <div className="p-6">
      <SearchBar />

       {error && (
       <p className="text-red-500 text-center my-4">
        {error}
      </p>
      )}
      
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;