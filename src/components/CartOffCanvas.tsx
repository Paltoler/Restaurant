import { useNavigate } from "react-router-dom";
import { useCart } from "./data/contexts/CartContext";
import { Cart } from "./data/types/Cart";
import { Drink } from "./data/types/Drink";
import { Recipe } from "./data/types/Recipe";
import { MenuCartItem } from "./data/types/MenuCartItem";
import { CartItem } from "./data/types/CartItem";
import { IsDrink } from "./data/IsDrink";

export const CartOffCanvas = () => {
  const { decreaseQuantity, increaseQuantity, removeFromCart, getCart } = useCart();
  const navigate = useNavigate();
  const orders: Cart = getCart();

  const handleButtonClick = () => {
    navigate("/cartpage", { state: { totalSum: totalSum() } });
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

  const renderItemDetails = (item: Drink | Recipe | null) => {
    if (!item) return <p>Item not found.</p>;
    else if ("idDrink" in item) {
      return <>{item.strDrink}</>;
    } else {
      return <>{item.title}</>;
    }
  };

  if (location.pathname === "/") {
    return null;
  }

  return (
    <>
      <div className="container-fluid pb-5 p-0">
        <div className="row bg-secondary-subtle p-4">
          {orders.MenuItems.length > 0 &&
            orders.MenuItems.map((order, index) => (
              <div key={index} className="card bg-transparent border-0">
                <div className="row my-3">
                  <div className="col-sm-3 col-2 d-none d-sm-block pe-3">
                    <img src={order.Main.imageUrl} alt={order.Main.title} className="card-img"></img>
                  </div>
                  <div className="col-sm-9 cart-border d-flex justify-content-between ps-1 pb-0">
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
                    <div className="d-block">
                      <div className="d-block">
                        <div className="row">
                          <div className="d-flex justify-content-between">
                            <i className="bi-trash-fill text-dark fs-5" onClick={() => removeFromCart(order)}></i>
                            <div className="qty-container">
                              <button className="qty-button qty-button-left text-dark" onClick={() => decreaseQuantity(order)} disabled={order.Quantity === 1}>
                                -
                              </button>
                              <span className="qty-value">{order.Quantity}</span>
                              <button className="qty-button qty-button-right text-dark" onClick={() => increaseQuantity(order)}>
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row text-end mt-2">
                        <h4 className="text-dark">{calculateMealPrice(order)} kr</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {orders.Items.length > 0 &&
            orders.Items.map((order, index) => (
              <div key={index} className="card bg-transparent border-0">
                <div className="row text-start my-3">
                  <div className="col-sm-3 col-2 d-none d-sm-block pe-3">
                    <img
                      src={IsDrink(order.Item) ? order.Item?.strDrinkThumb : order.Item?.imageUrl}
                      alt={IsDrink(order.Item) ? order.Item?.strDrink : order.Item?.title}
                      className="card-img"
                    />
                  </div>
                  <div className="col-sm-9 cart-border d-flex justify-content-between ps-1 pb-0">
                    <div className="d-block">
                      <h5>
                        {order.Quantity}x {renderItemDetails(order.Item)}
                      </h5>
                    </div>
                    <div className="d-block">
                      <div className="row">
                        <div className="d-flex justify-content-between">
                          <i className="bi-trash-fill text-dark fs-5" onClick={() => removeFromCart(order)}></i>
                          <div className="qty-container">
                            <button className="qty-button qty-button-left text-dark" onClick={() => decreaseQuantity(order)} disabled={order.Quantity === 1}>
                              -
                            </button>
                            <span className="qty-value">{order.Quantity}</span>
                            <button className="qty-button qty-button-right text-dark" onClick={() => increaseQuantity(order)}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row text-end mt-2">
                        <h4 className="text-dark">{calculateItemPrice(order)} kr</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="d-flex justify-content-between align-items-center bg-white p-2 position-absolute fixed-bottom">
              <h4 className="m-2">Totalt: {totalSum()}kr</h4>
            <button className="cart-total-box-2 btn w-auto m-0" type="submit" onClick={handleButtonClick} data-bs-dismiss="offcanvas" aria-label="Close">
              Till Varukorgen
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
