import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const api = axios.create({
  baseURL: "https://api.spoonacular.com",
});

export const searchRecipes = async (query) => {
  const response = await api.get("/recipes/complexSearch", {
    params: {
      query,
      diet: "vegetarian",
      number: 12,
      addRecipeInformation: true,
      apiKey: API_KEY,
    },
  });

  return response.data.results;
};

export const getRecipeDetails = async (id) => {
  const response = await api.get(`/recipes/${id}/information`, {
    params: {
      apiKey: API_KEY,
    },
  });

  return response.data;
};