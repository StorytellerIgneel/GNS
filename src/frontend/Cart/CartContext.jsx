import { createContext, useState, useEffect, useContext } from "react";
import UserContext from "../pages/LoginContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // const { user } = useContext(UserContext); // Access user from UserContext
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Retrieve cart items from localStorage on component mount
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    setCart(storedCart);
  }, []);

  useEffect(() => {
    // Retrieve the current cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add new items to the cart
    const updatedCart = [...storedCart, ...cart];

    // Remove duplicates based on item.id (optional, if you want unique items)
    const uniqueCart = Array.from(
      new Set(updatedCart.map((item) => item.game_id)),
    ).map((id) => updatedCart.find((item) => item.game_id === id));

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(uniqueCart));
    //console.log('Cart updated and saved to localStorage:', uniqueCart);
    //console.log(localStorage.getItem("cart"));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (game_id) => {
    console.log(game_id);
    setCart((prevCart) => prevCart.filter((game) => game.game_id !== game_id));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, game) => total + parseFloat(game.price), 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getTotalPrice, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
