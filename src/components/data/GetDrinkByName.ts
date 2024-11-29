import { useEffect, useState } from "react"
import { Drink } from "./types/Drink"

export const GetDrinkByName = (query: string) => {
    const BASE_URL = "www.thecocktaildb.com/api/json/v1/1/search.php?s="; 
    
    const[drink, setDrink] = useState<Drink[]>([]);
    useEffect(() => {
        const fetchDrink = async () => {
            const response = (await fetch(BASE_URL + query));
            const drink:Drink[] = await response.json();
            setDrink(drink);
        };
        fetchDrink();
    }, []);
    
    return drink[0];
}
