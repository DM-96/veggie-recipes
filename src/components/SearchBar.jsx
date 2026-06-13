import { useState, useContext } from "react";
import { searchRecipes } from "../services/api";
import { RecipeContext } from "../context/RecipeContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const {
    setRecipes,
    setLoading,
    setError,
  } = useContext(RecipeContext);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) return;

    try {
      setLoading(true);
      setError(null);

      const data = await searchRecipes(query);
      setRecipes(data);

    } catch (err) {

      if (err.response) {
        const status = err.response.status;

        if (status === 401) {
          setError("API key non valida.");
        } else if (status === 402) {
          setError("Quota API esaurita.");
        } else if (status === 404) {
          setError("Nessuna ricetta trovata.");
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

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-4 justify-center mb-10"
    >
      <input
        type="text"
        placeholder="Search vegetarian recipes..."
        className="border p-3 rounded-lg w-[300px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
        Search
      </button>
    </form>
  );
};

export default SearchBar;