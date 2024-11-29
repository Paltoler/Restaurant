import { Drink } from "./Drink";
import { Recipe } from "./Recipe";

export type CartItem = {
  Id: string;
  Quantity: number;
  Item: Drink | Recipe | null;
};
