// import { useNavigate } from "react-router-dom";
import { useCart } from "./data/contexts/CartContext";
import { Cart } from "./data/types/Cart";
import { CartItem } from "./data/types/CartItem";
import { MenuCartItem } from "./data/types/MenuCartItem";
import { IsDrink } from "./data/IsDrink";
import { Header } from "./Header";

export const CartPage = () => {
  const { decreaseQuantity, increaseQuantity, removeFromCart, getCart } =
    useCart();
  // const navigate = useNavigate();
  const orders: Cart = getCart();

  /*   const handleButtonClick = () => {
    navigate("/paymentpage", { state: { totalSum: totalSum() } });
  }; */

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
    return order.Item.price * order.Quantity;
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

  return (
    <>
      <div className="container d-block text-bg-white my-5">
        <div className="row">
          <Header />
        </div>
        <div className="row text-center mb-5 p-0">
          <h1>Din beställning:</h1>
        </div>
        <div className="cart-container mx-auto">
          <div className="row bg-secondary-subtle rounded-4 m-sm-5 m-1 p-md-4 p-1">
            <div className="scrollable-div-cart">
              {orders.MenuItems.length > 0 && (
                <div className="row px-lg-5">
                  {orders.MenuItems.map((order, index) => (
                    <div
                      key={index}
                      className="card bg-transparent border-0 px-sm-5"
                    >
                      <div className="row text-start my-3">
                        <div className="col-lg-1 d-none d-lg-block"></div>
                        <div className="col-lg-2 d-none d-lg-block px-4">
                          <img
                            src={order.Main.imageUrl}
                            alt={order.Main.title}
                            className="card-img"
                          ></img>
                        </div>
                        <div className="col-lg-8 cart-border d-flex justify-content-between px-sm-2 pb-0 px-1">
                          <div className="d-block">
                            <h4>
                              {order.Quantity}x {order.Main.title}
                            </h4>
                            <h6>
                              <i className="bi-dash"></i> {order.Side.title}
                            </h6>
                            <h6>
                              <i className="bi-dash"></i> {order.Drink.strDrink}
                            </h6>
                          </div>
                          <div className="d-block">
                            <div className="row">
                              <div className="d-flex justify-content-between">
                                <i
                                  className="bi-trash-fill text-dark fs-5"
                                  onClick={() => removeFromCart(order)}
                                ></i>
                                <div className="qty-container">
                                  <button
                                    className="qty-button qty-button-left text-dark"
                                    onClick={() => decreaseQuantity(order)}
                                    disabled={order.Quantity === 1}
                                  >
                                    -
                                  </button>
                                  <span className="qty-value">
                                    {order.Quantity}
                                  </span>
                                  <button
                                    className="qty-button qty-button-right text-dark"
                                    onClick={() => increaseQuantity(order)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="row text-end mt-3">
                              <h4 className="text-dark">
                                {calculateMealPrice(order)} kr
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-1 d-none d-lg-block"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {orders.Items.length > 0 && (
                <div className="row px-lg-5">
                  {orders.Items.map((order, index) => (
                    <div
                      key={index}
                      className="card bg-transparent border-0 px-sm-5"
                    >
                      <div className="row text-start my-3">
                        <div className="col-lg-1 d-none d-lg-block"></div>
                        <div className="col-lg-2 d-none d-lg-block px-4">
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
                        <div className="col-md-8 cart-border d-flex justify-content-between p-2 pb-0">
                          <div className="d-block">
                            <h4>
                              {order.Quantity}x{" "}
                              {IsDrink(order.Item)
                                ? order.Item?.strDrink
                                : order.Item?.title}
                            </h4>
                          </div>
                          <div className="d-block">
                            <div className="row">
                              <div className="d-flex justify-content-between">
                                <i
                                  className="bi-trash-fill text-dark fs-5"
                                  onClick={() => removeFromCart(order)}
                                ></i>
                                <div className="qty-container">
                                  <button
                                    className="qty-button qty-button-left text-dark"
                                    onClick={() => decreaseQuantity(order)}
                                    disabled={order.Quantity === 1}
                                  >
                                    -
                                  </button>
                                  <span className="qty-value">
                                    {order.Quantity}
                                  </span>
                                  <button
                                    className="qty-button qty-button-right text-dark"
                                    onClick={() => increaseQuantity(order)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="row text-end mt-3">
                              <h4 className="text-dark">
                                {calculateItemPrice(order)} kr
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-1 d-none d-lg-block"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <h3 className="cart-total-box-2 w-auto m-0">
                Total: {totalSum()}kr
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
