import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drink } from "./data/types/Drink";
import { GetDrinkById } from "./data/GetDrinkById";
import { Drinkmatcher } from "./data/Drinkmatcher";
import { IsRecipe } from "./data/IsRecipe";
import { useCart } from "./data/contexts/CartContext";
import { Recipe } from "./data/types/Recipe";
import { MenuCartItem } from "./data/types/MenuCartItem";
import { Header } from "./Header";

export const ChooseDrink = () => {
  const navigate = useNavigate();
  const { addToCart, createMenuCartItem, castToCartItem } = useCart();

  const mainJSON = localStorage.getItem("MenuCartItemMain");
  const mainDish: Recipe | null = mainJSON ? JSON.parse(mainJSON) : null;

  const recommendedDrinkId = mainDish && IsRecipe(mainDish) ? Drinkmatcher(mainDish) : null;
  const recommendedDrink: Drink | null = recommendedDrinkId !== null ? GetDrinkById(recommendedDrinkId) : null;

  const safeParse = (item: string | null) => {
    try {
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("Failed to parse item from localStorage:", e);
      return null;
    }
  };

  const initialDrink = safeParse(localStorage.getItem("SelectedDrink"));
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(
    initialDrink || recommendedDrink
  );

  useEffect(() => {
    if (selectedDrink) {
      localStorage.setItem("SelectedDrink", JSON.stringify(selectedDrink));
    }
  }, [selectedDrink]);

  const drinkList: Drink[] = [
    GetDrinkById(12790) as Drink,
    GetDrinkById(11113) as Drink,
    GetDrinkById(11242) as Drink,
    GetDrinkById(12418) as Drink,
    GetDrinkById(14482) as Drink,
    GetDrinkById(11007) as Drink,
    GetDrinkById(12186) as Drink,
    GetDrinkById(17221) as Drink,
    GetDrinkById(12654) as Drink,
    GetDrinkById(12698) as Drink,
    GetDrinkById(12736) as Drink,
  ];

  const handleSelectionChange = () => {
    if (mainDish) {
      buildMenuCartItem();
    } else {
      addDrinkToCart(selectedDrink!);
    }
  };

  const isSelected = (drink: Drink) => {
    return selectedDrink !== null && drink !== null && selectedDrink.idDrink === drink.idDrink;
  };

  const addDrinkToCart = (drink: Drink) => {
    handleDrinkChange(drink);
    const drinkCartItem = castToCartItem(drink);
    addToCart(drinkCartItem);
    navigate("/store");
  };

  const buildMenuCartItem = () => {
    const sideDishJSON = localStorage.getItem("MenuCartItemSide");
    const sideDish: Recipe = sideDishJSON ? JSON.parse(sideDishJSON) : {};
    const newMenuCartItem: MenuCartItem = createMenuCartItem(
      mainDish!,
      sideDish!,
      selectedDrink!
    );
    addToCart(newMenuCartItem);
    console.log(newMenuCartItem);
    localStorage.clear();
    navigate("/store");
  };

  const handleDrinkChange = (drink: Drink) => {
    const updatedDrink = {
      ...drink,
      price: getDrinkPrice(drink.strAlcoholic),
    };
    setSelectedDrink(updatedDrink);
  };

  const translateAlcoholicStatus = (status: string | undefined) => {
    switch (status) {
      case "Alcoholic":
        return "Alkohol";
      case "Non alcoholic":
        return "Alkoholfri";
      default:
        return status;
    }
  };

  const getDrinkPrice = (strAlcoholic: string) => {
    switch (strAlcoholic) {
      case "Alcoholic":
        return 149;
      case "Non alcoholic":
        return 99;
      default:
        return 0;
    }
  };

  const recipeTitle =
    mainDish && mainDish && IsRecipe(mainDish) ? mainDish.title : "";

    const cancelAlert = () => {
      let text = "Din beställning kommer avslutas";
      if (confirm(text) == true) {
        text = "You pressed OK!";
        cancelMenuOrder();
      } else {
        text = "You canceled!";
      }
     }
      const cancelMenuOrder = () => {
        localStorage.clear();
        navigate("/store");
      }

  return (
    <div className="container-fluid max-width p-sm-5 p-3 my-5 pb-5">
      <Header />
      <h3 className="display-6 text-center mb-4">Välj dryck:</h3>
      <h3 className="display-7 text-center mb-4">
        Alkoholhaltig: 149kr / Alkoholfri: 99kr
      </h3>

      <div className="row d-flex justify-content-center mt-0 pt-0">
        {recommendedDrink && (
          <div
            key={recommendedDrink.idDrink}
            className="col-lg-3 d-flex align-items-end g-4 rounded-2"
          >
            <div className={`card h-100 product-body`}>
              <img
                src={recommendedDrink.strDrinkThumb}
                className="card-img-top h-100"
                alt={"Image of " + recommendedDrink.strDrink}
              />
              <div
                className="badge bg-custom badge-m position-absolute py-2"
                style={{ bottom: "1rem", right: "1rem" }}
              >
                <strong>Rekommenderas till </strong>
                <br></br>
                {recipeTitle}
              </div>
              <button
                onClick={() => handleDrinkChange(recommendedDrink)}
                className={`btn product-button ${
                  isSelected(recommendedDrink) ? "bg-success" : "bg-custom"
                } text-white border-0 shadow-lg rounded-pill `}
              >
                <i
                  className={`bi ${
                    isSelected(recommendedDrink) ? "bi-check-lg" : "bi-plus-lg"
                  } display-6 border-0`}
                ></i>
              </button>
              <div className="p-2 text-start align-bottom">
                <h4 className="text-nowrap fs-5 m-1 p-0">
                  {recommendedDrink.strDrink}
                </h4>
                <div className="m-0 p-0">
                  <p className="text-nowrap m-1 pt-2">
                    {translateAlcoholicStatus(recommendedDrink?.strAlcoholic)}
                  </p>
                  <p className="text-nowrap m-1 pt-2">
                    {getDrinkPrice(recommendedDrink?.strAlcoholic) + " :-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {drinkList.map((drink) => (
          <div
            key={drink?.idDrink}
            className="col-lg-3 d-flex align-items-end g-4 rounded-2"
          >
            <div className={`card h-100 product-body`}>
              <img
                src={drink?.strDrinkThumb}
                className="card-img-top h-100"
                alt={"Image of" + drink?.strDrink}
              />
              <div className="p-2 text-start align-bottom">
                <h4 className="text-nowrap fs-5 m-1 p-0">{drink?.strDrink}</h4>
                <div className="m-0 p-0">
                  <p className="text-nowrap m-1 pt-2">
                    {translateAlcoholicStatus(drink?.strAlcoholic)}
                  </p>
                  <p className="text-nowrap m-1 pt-2">
                    {getDrinkPrice(drink?.strAlcoholic) + " :-"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDrinkChange(drink)}
                className={`btn product-button ${
                  isSelected(drink) ? "bg-success" : "bg-custom"
                } text-white border-0 shadow-lg rounded-pill `}
              >
                <i
                  className={`bi ${
                    isSelected(drink) ? "bi-check-lg" : "bi-plus-lg"
                  } display-6 border-0`}
                ></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-nav text-center">
        <button
          className="btn btn-lg btn-dark nav-btn shadow-lg mx-lg-5 mx-2 my-2 p-0"
          onClick={
            mainDish ? () => navigate("/chooseside") : () => navigate("/store")
          }
        >
          Tillbaka
        </button>

        <button 
          className="btn btn-lg btn-dark nav-btn shadow-lg mx-lg-5 mx-2 my-2 p-0"
          onClick={
            () => cancelAlert()
          }>
            Avbryt
        </button>

        <button
          className={`btn btn-lg btn-dark nav-btn shadow-lg mx-lg-5 mx-2 my-2 p-0${
            selectedDrink ? "" : " disabled"
          }`}
          onClick={() => handleSelectionChange()}
        >
          Klar
        </button>
      </div>
    </div>
  );
};
