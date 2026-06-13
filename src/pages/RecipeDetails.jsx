import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeDetails } from "../services/api";
import DOMPurify from "dompurify";
import Loader from "../components/Loader";

const RecipeDetails = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecipeDetails(id);
        setRecipe(data);

      } catch (err) {

        if (err.response) {
          const status = err.response.status;

          if (status === 401) {
            setError("API key non valida.");
          } else if (status === 402) {
            setError("Quota API esaurita.");
          } else if (status === 404) {
            setError("Ricetta non trovata.");
          } else {
            setError("Errore del server. Riprova più tardi.");
          }

        } else if (err.request) {
          setError("Problema di connessione. Controlla internet.");

        } else {
          setError("Errore imprevisto.");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        {error}
      </p>
    );
  }

  if (loading) {
    return ( <Loader />);
  }

  if (!recipe) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">

      <Link
        to="/"
        className="inline-block mb-6 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Back Home
      </Link>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full rounded-xl mb-6 shadow-md"
      />

      <h1 className="text-4xl font-bold mb-4">
        {recipe.title}
      </h1>

      <p className="text-lg mb-6">
        Ready in {recipe.readyInMinutes} minutes
      </p>

      <h2 className="text-2xl font-bold mb-4">
        Ingredients
      </h2>

      <ul className="mb-8 list-disc pl-6">
        {recipe.extendedIngredients?.map((item) => (
          <li key={item.id} className="mb-2">
            {item.original}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4">
        Instructions
      </h2>

      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(recipe.instructions),
        }}
      />
    </div>
  );
};

export default RecipeDetails;