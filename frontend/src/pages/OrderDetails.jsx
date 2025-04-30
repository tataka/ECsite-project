// src/pages/OrderDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/orders/${orderId}/items`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('注文詳細取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>注文ID: {orderId} の商品一覧</h2>
      <Link to="/admin">← 管理者ページに戻る</Link>
      {loading ? (
        <p>読み込み中...</p>
      ) : items.length === 0 ? (
        <p>商品が見つかりません。</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: '1rem', width: '100%' }}>
          <thead>
            <tr>
              <th>Gender</th>
              <th>Category</th>
              <th>Name</th>
              <th>Product Code</th>
              <th>Color</th>
              <th>Color Code</th>
              <th>Size</th>
              <th>Size Code</th>
              <th>点数</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.gender}</td>
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>{item.product_code}</td>
                <td>{item.color}</td>
                <td>{item.color_code}</td>
                <td>{item.size}</td>
                <td>{item.size_code}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderDetails;
