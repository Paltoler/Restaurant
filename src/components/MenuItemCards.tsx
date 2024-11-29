import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./data/contexts/CartContext";
import { Recipe } from "./data/types/Recipe";
import { Header } from "./Header";
import { GetRecipes } from "./data/GetRecipes";

export const MenuItemCards = () => {
  const navigate = useNavigate();
  const { addToCart, castToCartItem } = useCart();
  const [alert, setAlert] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Huvudrätt");
  const filters = [
    "Huvudrätt",
    "Förrätt",
    "Fläskkött",
    "Fågel",
    "Nötkött",
    "Vegetariskt",
  ];
  const recipes: Recipe[] = GetRecipes().filter(
    (recipe) => !recipe.categories.includes("Tillbehör")
  );
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.categories.includes(selectedCategory)
  );

  const [clickedRecipeId, setClickedRecipeId] = useState(null);

  const handleButtonClick = (filter: string) => {
    setSelectedCategory(filter);
  };

  const changeAlert = (alert: string) => {
    setAlert(alert);
    setTimeout(() => setAlert(""), 2000);
  };

  const chooseItem = (selectedRecipe: Recipe) => {
    changeAlert(selectedRecipe.title);
    const newCartItem = castToCartItem(selectedRecipe);
    addToCart(newCartItem);

    setClickedRecipeId(selectedRecipe._id);

    setTimeout(() => {
      setClickedRecipeId(null);
    }, 2000);
  };

  const startMenuOrder = (selectedRecipe: Recipe) => {
    console.log("Huvudrätt!");
    localStorage.setItem("MenuCartItemMain", JSON.stringify(selectedRecipe));
    navigate("/chooseside");
  };

  return (
    <div className="container-fluid max-width p-sm-5 p-3 my-5 pb-5">
      <Header />
      <h2 className="text-center">Välj huvudrätt:</h2>
      <div className="row g-3 mt-2 px-md-5">
        {filters.map((filter) => (
          <div key={filter} className="col-md-2">
            <button
              className={`btn btn-sm btn-outline-light border-custom text-uppercase w-100 ${
                filter === selectedCategory ? "filter-active" : ""
              }`}
              onClick={() => handleButtonClick(filter)}
            >
              {filter}
            </button>
          </div>
        ))}
      </div>
      <div className="row g-3 mt-1 px-md-5">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="col-lg-3 col-md-6">
              <div className="card h-100">
                <img
                  src={recipe.imageUrl}
                  className="card-img-top"
                  alt={"Image of " + recipe.title}
                />
                <div className="p-2">
                  <h3 className="fs-5 m-1 p-0">{recipe.title}</h3>
                  <p className="m-1 pt-2">{recipe.description}</p>
                  <p className="m-1 pt-2">Pris: {recipe.price} kr</p>
                  {recipe.categories.includes("Huvudrätt") ? (
                    <button
                      onClick={() => startMenuOrder(recipe)}
                      className="btn product-button bg-custom text-white border-0 shadow-lg rounded-pill"
                    >
                      <i className="bi bi-plus-lg display-6 border-0"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => chooseItem(recipe)}
                      className={`btn product-button text-white border-0 shadow-lg rounded-pill ${
                        clickedRecipeId === recipe._id
                          ? "bg-success"
                          : "bg-custom"
                      }`}
                    >
                      <i
                        className={`bi ${
                          clickedRecipeId === recipe._id
                            ? "bi-check-lg"
                            : "bi-plus-lg"
                        } display-6 border-0`}
                      ></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Inga recept tillgängliga</p>
        )}
      </div>
      <div
        className={`alert alert-success position-fixed w-50 bottom-0 justify-content-center ${
          alert ? "d-flex" : "d-none"
        }`}
        role="alert"
      >
        <p className="mb-0">{`${alert} lades till i varukorgen!`}</p>       
      </div>
    </div>
  );
};
