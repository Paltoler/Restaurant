import { Drink } from "./types/Drink";
import { Recipe } from "./types/Recipe";

export function IsDrink(item: Drink | Recipe | null): item is Drink {
  return item !== null && (item as Drink).strDrink !== undefined;
}
