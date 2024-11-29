export type Ingredient = {
    name: string;
    amount: number;
    unit: string;
  };
  
  export type Recipe = {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    categories: string[];
    ingredients: Ingredient[];
    price: number;
  };
  