import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-[200px] object-cover"
        />

        <div className="p-4">
          <h2 className="font-bold text-lg">
            {recipe.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;