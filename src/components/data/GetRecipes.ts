import { useEffect, useState } from "react";
import { Recipe } from "./types/Recipe";

export const GetRecipes = (): Recipe[] => {
  const BASE_URL = "https://iths-2024-recept-grupp1-r469p0.reky.se/recipes";

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(BASE_URL);
      const fetchedRecipes: Recipe[] = await response.json();

      // Sorterar hämtade recipes efter categories.
      const sortedRecipes = fetchedRecipes.sort((a, b) => {
        return a.categories < b.categories ? -1 : 1;
      });

      setRecipes(sortedRecipes);
    };

    fetchRecipes();
  }, []);

  return recipes;
};
