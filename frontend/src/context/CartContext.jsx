// frontend/src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        item =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id &&
            item.color === product.color &&
            item.size === product.size
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productToRemove) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        item =>
          item.id === productToRemove.id &&
          item.color === productToRemove.color &&
          item.size === productToRemove.size
      );

      if (!existingItem) return prevItems;

      if (productToRemove.quantity && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === productToRemove.id &&
            item.color === productToRemove.color &&
            item.size === productToRemove.size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter(item =>
          !(item.id === productToRemove.id &&
            item.color === productToRemove.color &&
            item.size === productToRemove.size)
        );
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};