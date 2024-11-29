import { Drink } from "./data/types/Drink";
import { GetDrinkById } from "./data/GetDrinkById";
import { useCart } from "./data/contexts/CartContext";
import { Header } from "./Header";
import { useState } from "react";

export const DrinkMenuPage = () => {
  const { addToCart, castToCartItem } = useCart();
  const [selectedDrinkId, setSelectedDrinkId] = useState<number>();
  const [alert, setAlert] = useState("");

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

  const changeAlert = (alert: string) => {
    setAlert(alert);
    setTimeout(() => setAlert(""), 2000);
  };


  const addDrinkToCart = (drink: Drink) => {
    changeAlert(drink.strDrink);
    const updatedDrink = {
      ...drink,
      price: getDrinkPrice(drink.strAlcoholic),
    };
    const drinkCartItem = castToCartItem(updatedDrink);
    addToCart(drinkCartItem);

    setSelectedDrinkId(drink.idDrink);

    setTimeout(() => {
      setSelectedDrinkId(undefined);
    }, 2000);
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

  return (
    <div className="container-fluid max-width p-sm-5 p-3 my-5 pb-5">
      <Header />
      <h3 className="display-6 text-center mb-4">Välj dryck:</h3>
      <h3 className="display-7 text-center mb-4">
        Alkoholhaltig: 149kr / Alkoholfri: 99kr
      </h3>

      <div className="row g-3 mt-2 px-md-5">
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
                      onClick={() => addDrinkToCart(drink)}
                      className={`btn product-button text-white border-0 shadow-lg rounded-pill ${
                        selectedDrinkId === drink?.idDrink
                          ? "bg-success"
                          : "bg-custom"
                      }`}
                    >
                      <i
                        className={`bi ${
                          selectedDrinkId === drink?.idDrink
                            ? "bi-check-lg"
                            : "bi-plus-lg"
                        } display-6 border-0`}
                      ></i>
                    </button>
            </div>
          </div>
        ))}
        <div
        className={`alert alert-success position-fixed w-50 bottom-0 justify-content-center ${
          alert ? "d-flex" : "d-none"
        }`}
        role="alert"
      >
        <p className="mb-0">{`${alert} lades till i varukorgen!`}</p>
        
      </div>
      </div>
    </div>
  );
};