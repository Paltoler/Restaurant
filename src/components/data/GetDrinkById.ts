import { useState, useEffect } from 'react';
import { Drink } from "./types/Drink"
    
export const GetDrinkById = (id: number) => {
        const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="; 

        const[drink, setDrink] = useState<Drink>();
        useEffect(() => {
                const fetchDrink = async () => {
                const response = (await fetch(BASE_URL + id));                        
                const drinkObject = await response.json();
                const drink: Drink = drinkObject.drinks[0];
                setDrink(drink);        
            };
            fetchDrink();
        }, []);
                        
        return drink ? drink : null
}
