// components/pages/OrdersPage.jsx
import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('注文取得エラー:', err));
  }, []);

  return (
    <div>
      <h2>注文一覧</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>注文ID: {order.id} - ユーザーID: {order.user_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
