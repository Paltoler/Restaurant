import { useNavigate } from "react-router-dom";
import { Drink } from "./data/types/Drink";
import { Recipe } from "./data/types/Recipe";
import { useCart } from "./data/contexts/CartContext";
import { Cart } from "./data/types/Cart";
import { IsDrink } from "./data/IsDrink";
import { CartItem } from "./data/types/CartItem";
import { MenuCartItem } from "./data/types/MenuCartItem";
import { Header } from "./Header";

export const PaymentPage = () => {
  const navigate = useNavigate();
  const { clearCart, getCart } = useCart();
  const orders: Cart = getCart();

  const renderItemDetails = (item: Drink | Recipe | null) => {
    if (!item) return <p>Item not found.</p>;
    else if ("idDrink" in item) {
      return <>{item.strDrink}</>;
    } else {
      return <>{item.title}</>;
    }
  };

  const calculateMealPrice = (order: MenuCartItem) => {
    let sidePrice = 0;
    if (order.Side && Object.keys(order.Side).length !== 0) {
      sidePrice = order.Side.price;
    }
    return (order.Main.price + sidePrice + order.Drink.price) * order.Quantity;
  };

  const calculateItemPrice = (order: CartItem) => {
    if (order.Item === null) {
      return 0;
    }
    return order.Item?.price * order.Quantity;
  };

  const totalSum = () => {
    let sum = 0;
    orders.MenuItems.forEach((order) => {
      sum += calculateMealPrice(order);
    });
    orders.Items.forEach((order) => {
      sum += calculateItemPrice(order);
    });
    return sum;
  };

  const handleButtonClick = () => {
    localStorage.clear();
    clearCart();
    navigate("/confirmationpage");
  };

  return (
    <>
      <div className="container d-block text-bg-white my-5">
        <div className="row">
          <Header />
        </div>
        <div className="row text-center mb-5 p-0">
          <h1>Din beställning:</h1>
        </div>
        <div className="payment-container row w-75 min-vw-50 mx-auto">
          <div className="container-fluid p-0">
            <div className="row bg-secondary-subtle p-4 rounded-4">
              <div className="col-lg-6">
                <div className="row scrollable-div">
                  {orders.MenuItems.map((order, index) => (
                    <div key={index} className="card bg-transparent border-0">
                      <div className="row text-start my-3">
                        <div className="col-sm-3 col-2 d-none d-sm-block pe-3">
                          <img
                            src={order.Main.imageUrl}
                            alt={order.Main.title}
                            className="card-img"
                          ></img>
                        </div>
                        <div className="col-sm-9 col-10 d-flex justify-content-between ps-1 pb-0">
                          <div className="d-block">
                            <h5>
                              {order.Quantity}x {order.Main.title}
                            </h5>
                            <h6>
                              <i className="bi-dash"></i> {order.Side.title}
                            </h6>
                            <h6>
                              <i className="bi-dash"></i> {order.Drink.strDrink}
                            </h6>
                          </div>
                          <h5 className="text-end text-dark">
                            {calculateMealPrice(order)} kr
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                  {orders.Items.map((order, index) => (
                    <div key={index} className="card bg-transparent border-0">
                      <div className="row text-start my-3">
                        <div className="col-sm-3 col-2 d-none d-sm-block pe-3">
                          <img
                            src={
                              IsDrink(order.Item)
                                ? order.Item?.strDrinkThumb
                                : order.Item?.imageUrl
                            }
                            alt={
                              IsDrink(order.Item)
                                ? order.Item?.strDrink
                                : order.Item?.title
                            }
                            className="card-img"
                          />
                        </div>
                        <div className="col-sm-9 col-10 d-flex justify-content-between ps-1 pb-0">
                          <div className="d-block">
                            <h5>
                              {order.Quantity}x {renderItemDetails(order.Item)}
                            </h5>
                          </div>
                          <h5 className="text-end text-dark">
                            {calculateItemPrice(order)} kr
                          </h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/*                 <div className="d-flex justify-content-center alignt-items-center bg-white total-container position-sticky">
                  <p style={{ color: "#1f1f1f" }}>Totalt: {totalSum()}kr</p>
                </div> */}
                <div className="d-flex justify-content-center">
                  <h3 className="cart-total-box-2 w-auto m-0">
                    Total: {totalSum()}kr
                  </h3>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="accordion-box w-100 mt-2">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingCard">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseCard"
                          aria-expanded="false"
                          aria-controls="collapseCard"
                        >
                          Betalkort
                        </button>
                      </h2>
                      <div
                        id="collapseCard"
                        className="accordion-collapse collapse-show"
                        aria-labelledby="headingCard"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="cardNumber"
                                className="form-label"
                              ></label>
                              <input
                                type="text"
                                className="form-control"
                                id="cardNumber"
                                placeholder="Kortnummer"
                                minLength={16}
                                maxLength={16}
                                required
                              />
                            </div>

                            <div className="d-flex">
                              <div className="mb-3 flex-grow-1 me-2">
                                <label
                                  htmlFor="expirationDate"
                                  className="form-label"
                                ></label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="expirationDate"
                                  placeholder="Utgångsdatum"
                                  required
                                />
                              </div>

                              <div className="mb-3 flex-grow-2">
                                <label
                                  htmlFor="cvc"
                                  className="form-label"
                                ></label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cvc"
                                  placeholder="CVC"
                                  minLength={3}
                                  maxLength={3}
                                  required
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="btn btn-success"
                              onClick={handleButtonClick}
                            >
                              Betala
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingSwish">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseSwish"
                          aria-expanded="false"
                          aria-controls="collapseSwish"
                        >
                          Swish
                        </button>
                      </h2>
                      <div
                        id="collapseSwish"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingSwish"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="swishNumber"
                                className="form-label"
                              ></label>
                              <input
                                type="tel"
                                className="form-control"
                                id="swishNumber"
                                placeholder="Telefonnummer"
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-success"
                              onClick={handleButtonClick}
                            >
                              Betala
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
