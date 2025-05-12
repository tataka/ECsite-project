import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/AdminOrders.module.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // ここで定義しておく
  const fetchOrders = async () => {
    const res = await fetch('http://localhost:3001/api/admin/orders');
    const data = await res.json();
    setOrders(data);
  };

  // この中でfetchOrdersを使う
  const handleConfirmOrder = async (orderId, userId) => {
    const confirm = window.confirm('本当に確定していいですか？');
    if (!confirm) return;

    try {
      console.log('送信するデータ:', { orderId, userId });
      const res = await fetch(`http://localhost:3001/api/orders/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, userId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`APIエラー: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      console.log('レスポンス:', data);

      if (data.success) {
        alert('注文が確定され、メールが送信されました。');
        fetchOrders(); // ここで呼べるようになる
      } else {
        alert('確定処理に失敗しました。');
      }
    } catch (error) {
      console.error('確定エラー:', error);
      alert('エラーが発生しました。詳細はコンソールを確認してください。');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>注文一覧</h2>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>注文ID</th>
            <th>ステータス</th>
            <th>ユーザーID</th>
            <th>注文日</th>
            <th>注文確定</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>
                <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
              </td>
              <td>{order.status}</td>
              <td>{order.user_id}</td>
              <td>{new Date(order.order_date).toLocaleString()}</td>
              <td>
                {order.status === '確定' ? (
                  '確定'
                ) : (
                  <button
                    onClick={() => handleConfirmOrder(order.id, order.user_id)}
                    style={{ color: 'blue', cursor: 'pointer', background: 'none', border: 'none' }}
                  >
                    未確定
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
