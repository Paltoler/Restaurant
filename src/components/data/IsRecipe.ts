import { Drink } from "./types/Drink";
import { Recipe } from "./types/Recipe";

export function IsRecipe(item: Drink | Recipe | null): item is Recipe {
  return item !== null && (item as Recipe).title !== undefined;
}
