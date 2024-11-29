import { CartItem } from "./types/CartItem";
import { IsRecipe } from "./IsRecipe";
import { Recipe } from "./types/Recipe";

export const Drinkmatcher = (recipe: Recipe): number => {
  if (!recipe) return 0;

  if (IsRecipe(recipe)) {
    switch (recipe.title) {
      case "Bogbladsstek":
        return 11227;
      case "Kotlett":
        return 17074;
      case "Ryggbiff":
        return 13423;
      case "Oxfilé":
        return 13086;
      case "Kycklingbröstfilé":
        return 15849;
      case "Fläskfilé":
        return 14272;
      case "Kycklingklubba":
        return 11288;
      case "Poke bowl":
        return 13899;
      case "Grekisk sallad":
        return 16108;
      default:
        return 0;
    }
  }

  return 0;
};
