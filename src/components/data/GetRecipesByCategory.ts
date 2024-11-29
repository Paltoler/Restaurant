import { useEffect, useState } from "react";
import { Recipe } from "./types/Recipe";

export const GetRecipesByCategory = (query: string) => {

    const BASE_URL = `https://iths-2024-recept-grupp1-r469p0.reky.se/categories/${query}/recipes`;

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    useEffect(() => {
        const fetchRecipeByCategory = async () => {
            const response = await fetch(BASE_URL);
            if(!response.ok) {
                throw new Error("API-GetByCategory failed to respond, invalid link or category?")
            }
            const recipes: Recipe[] = await response.json()
            if(recipes.length === 0) {
                console.log("API-GetByCategory returned zero results")
            } else {
                setRecipes(recipes);
            }
        };
        fetchRecipeByCategory();
        
        }, []);

        return recipes;
}