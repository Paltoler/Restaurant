import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Recipe } from "./data/types/Recipe";
import { GetRecipesByCategory } from "./data/GetRecipesByCategory";

export const ChooseSides = () => {
  const sideDishes = GetRecipesByCategory("Tillbehör");

  const initialSide = localStorage.getItem("SelectedSide");
  const [selectedSide, setSelectedSide] = useState<Recipe | null>(
    initialSide ? JSON.parse(initialSide) : null
  );

  useEffect(() => {
    if (selectedSide) {
      localStorage.setItem("SelectedSide", JSON.stringify(selectedSide));
    }
  }, [selectedSide]);

  const handleAddSide = (side: Recipe) => {
    setSelectedSide(side);
    localStorage.setItem("MenuCartItemSide", JSON.stringify(side));
  };

  return (
    <div className="container-fluid max-width p-sm-5 p-3 my-5 pb-5">
      <Header />
      <h2 className="text-center">Välj tillbehör:</h2>
      <div className="row g-3 mt-2 px-md-5">
        {sideDishes.map((sideDish) => (
          <div key={sideDish._id} className="col-lg-3 col-md-6">
            <div className="card h-100">
              <img src={sideDish.imageUrl} className="card-img-top" alt={"Image of " + sideDish.title} />
              <div className="p-2">
                <h3 className="fs-5 m-1 p-0">{sideDish.title}</h3>
                <p className="m-1 pt-2">Ingår till huvudrätt</p>
                <p className="m-1 pt-2">{sideDish.description}</p>
                <button
                  onClick={() => handleAddSide(sideDish)}
                  className={`btn product-button ${
                    selectedSide && selectedSide._id === sideDish._id ? "bg-success" : "bg-custom"
                  } text-white border-0 shadow-lg rounded-pill`}>
                  <i className={`bi ${selectedSide && selectedSide._id === sideDish._id ? "bi-check-lg" : "bi-plus-lg"} display-6 border-0`}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
