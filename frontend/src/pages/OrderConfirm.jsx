// frontend/src/components/OrderConfirm.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const OrderConfirm = () => {
  const location = useLocation();
  const { cartItems } = location.state || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handleConfirm = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();

      if (result.success) {
        const userId = result.user.id;

        const orderRes = await fetch('http://localhost:3001/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartItems, userId, email })
        });

        const orderResult = await orderRes.json();
        clearCart();
        alert(`注文が完了しました。注文ID: ${orderResult.orderId}`);
        navigate('/');
      } else {
        alert('ユーザーが存在しません。登録ページに移動します。');
        navigate('/regist');
      }
    } catch (error) {
      console.error('確認エラー:', error);
      alert('エラーが発生しました');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>注文確認</h2>
      <label>
        メールアドレス：
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        パスワード：
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleConfirm}>注文確定</button>
    </div>
  );
};

export default OrderConfirm;
