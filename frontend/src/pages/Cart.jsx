// frontend/src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, getTotalPrice, clearCart } = useCart();

  const incrementQuantity = (item) => {
    addToCart(item);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      removeFromCart({ ...item, quantity: 1 });
    } else {
      removeFromCart(item);
    }
  };

  if (cartItems.length === 0) {
    return <div>カートは空です。</div>;
  }

  const handleOrder = () => {
    navigate('/order-confirm', { state: { cartItems } });
  };

  return (
    <div>
      <h1>カート</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>品番: {item.product_code}</p>
            <p>カラー: {item.color} {item.color_code && `(${item.color_code})`}</p>
            <p>サイズ: {item.size} {item.size_code && `(${item.size_code})`}</p>
            <p>価格: ¥{item.price}</p>
            <p>数量: {item.quantity || 1}</p>
            <div>
              <button onClick={() => decrementQuantity(item)}>-</button>
              <span>数量: {item.quantity || 1}</span>
              <button onClick={() => incrementQuantity(item)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '1rem' }}>
        <strong>合計金額: ¥{getTotalPrice()}</strong>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleOrder}>注文する</button>
      </div>
    </div>
  );
};

export default CartPage;
