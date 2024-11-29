import { createContext, useState, useContext, ReactNode } from "react";
import { CartItem } from "../types/CartItem"; // Adjust the import paths based on your project structure
import { Cart } from "../types/Cart";
import { Recipe } from "../types/Recipe";
import { Drink } from "../types/Drink";
import { IsRecipe } from "../IsRecipe";
import { IsDrink } from "../IsDrink";
import { MenuCartItem } from "../types/MenuCartItem";

type CartContext = {
  getCart: () => Cart;
  clearCart: () => void;
  createMenuCartItem: (
    main: Recipe,
    sideDish: Recipe,
    drink: Drink
  ) => MenuCartItem;
  castToCartItem: (item: Recipe | Drink) => CartItem;
  addToCart: (item: CartItem | MenuCartItem) => void;
  removeFromCart: (item: CartItem | MenuCartItem) => void;
  increaseQuantity: (item: CartItem | MenuCartItem) => void;
  decreaseQuantity: (item: CartItem | MenuCartItem) => void;
};

type CartContextProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContext>({} as CartContext);

export function CartProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<Cart>({
    Items: [],
    MenuItems: [],
    TotalSum: 0,
  });

  function getCart() {
    return cart;
  }

  function clearCart() {
    setCart({ Items: [], MenuItems: [], TotalSum: 0 });
  }

  function castToCartItem(item: Recipe | Drink): CartItem {
    return "idDrink" in item
      ? {
          Id: item.idDrink.toString(),
          Quantity: 1,
          Item: item,
        }
      : {
          Id: item._id,
          Quantity: 1,
          Item: item,
        };
  }

  function createMenuCartItem(
    main: Recipe,
    sideDish: Recipe,
    drink: Drink
  ): MenuCartItem {
    return {
      Id: (cart.MenuItems.length + 1).toString(),
      Main: main,
      Side: sideDish,
      Drink: drink,
      Quantity: 1,
    };
  }
  function addToCart(item: CartItem | MenuCartItem) {
    if ("Main" in item && "Side" in item && "Drink" in item) {
      const existingIndex = cart.MenuItems.findIndex(
        (mi) =>
          mi.Main.title === item.Main.title &&
          mi.Side.title === item.Side.title &&
          mi.Drink.strDrink === item.Drink.strDrink
      );
      if (existingIndex !== -1) {
        const updatedMenuItems = [...cart.MenuItems];
        updatedMenuItems[existingIndex].Quantity += 1;
        setCart((prevCart) => ({ ...prevCart, MenuItems: updatedMenuItems }));
      } else {
        setCart((prevCart) => ({
          ...prevCart,
          MenuItems: [...prevCart.MenuItems, item],
        }));
      }
    } else {
      let existingIndex = -1;

      if (IsRecipe(item.Item)) {
        existingIndex = cart.Items.findIndex(
          (ci) =>
            IsRecipe(ci.Item) &&
            IsRecipe(item.Item) &&
            ci.Item.title === item.Item.title
        );
      } else if (IsDrink(item.Item)) {
        existingIndex = cart.Items.findIndex(
          (ci) =>
            IsDrink(ci.Item) &&
            IsDrink(item.Item) &&
            ci.Item.strDrink === item.Item.strDrink
        );
      }

      if (existingIndex !== -1) {
        const updatedItems = [...cart.Items];
        updatedItems[existingIndex].Quantity += 1;
        setCart((prevCart) => ({ ...prevCart, Items: updatedItems }));
      } else {
        setCart((prevCart) => ({
          ...prevCart,
          Items: [...prevCart.Items, item],
        }));
      }
    }
  }

  function removeFromCart(item: CartItem | MenuCartItem) {
    if ("Main" in item) {
      const filteredMenuItems = cart.MenuItems.filter(
        (mi) => mi.Id !== item.Id
      );
      setCart((prevCart) => ({ ...prevCart, MenuItems: filteredMenuItems }));
    } else {
      const filteredItems = cart.Items.filter((ci) => ci.Id !== item.Id);
      setCart((prevCart) => ({ ...prevCart, Items: filteredItems }));
    }
  }

  function increaseQuantity(item: CartItem | MenuCartItem) {
    if ("Main" in item) {
      setCart((currentCart) => {
        const updatedItems = currentCart.MenuItems.map((mi) =>
          mi.Id === item.Id ? { ...mi, Quantity: mi.Quantity + 1 } : mi
        );
        return { ...currentCart, MenuItems: updatedItems };
      });
    } else {
      setCart((currentCart) => {
        const updatedItems = currentCart.Items.map((ci) =>
          ci.Id === item.Id ? { ...ci, Quantity: ci.Quantity + 1 } : ci
        );
        return { ...currentCart, Items: updatedItems };
      });
    }
  }

  function decreaseQuantity(item: CartItem | MenuCartItem) {
    if ("Main" in item) {
      setCart((currentCart) => {
        const updatedItems = currentCart.MenuItems.map((mi) =>
          mi.Id === item.Id
            ? { ...mi, Quantity: Math.max(mi.Quantity - 1, 0) }
            : mi
        ).filter((mi) => mi.Quantity > 0);
        return { ...currentCart, MenuItems: updatedItems };
      });
    } else {
      setCart((currentCart) => {
        const updatedItems = currentCart.Items.map((ci) =>
          ci.Id === item.Id
            ? { ...ci, Quantity: Math.max(ci.Quantity - 1, 0) }
            : ci
        ).filter((ci) => ci.Quantity > 0);
        return { ...currentCart, Items: updatedItems };
      });
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getCart,
        clearCart,
        castToCartItem,
        createMenuCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
