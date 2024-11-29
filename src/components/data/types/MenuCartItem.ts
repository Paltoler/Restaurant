import { Drink } from "./Drink";
import { Recipe } from "./Recipe";

export type MenuCartItem = {
  Id: string;
  Side: Recipe;
  Main: Recipe;
  Drink: Drink;
  Quantity: number;
};
