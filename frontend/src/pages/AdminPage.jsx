import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/AdminOrders.module.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const fetchOrders = async () => {
    const res = await fetch('http://localhost:3001/api/admin/orders');
    const data = await res.json();
    setOrders(data);
  };

  const handleConfirmOrder = async (orderId, userId) => {
    const confirm = window.confirm('本当に確定していいですか？');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3001/api/orders/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, userId }),
      });

      const data = await res.json();
      if (data.success) {
        alert('注文が確定され、メールが送信されました。');
        fetchOrders();
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];

    if (sortConfig.key === 'order_date') {
      return sortConfig.direction === 'asc'
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }

    if (typeof valA === 'string') {
      return sortConfig.direction === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
  });

  const sortArrow = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <main>
      <h2>注文一覧</h2>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>注文ID{sortArrow('id')}</th>
            <th onClick={() => handleSort('status')}>ステータス{sortArrow('status')}</th>
            <th onClick={() => handleSort('user_id')}>ユーザーID{sortArrow('user_id')}</th>
            <th onClick={() => handleSort('order_date')}>注文日{sortArrow('order_date')}</th>
            <th>注文確定</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map(order => (
            <tr key={order.id}>
              <td><Link to={`/admin/orders/${order.id}`}>{order.id}</Link></td>
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
    </main>
  );
};

export default AdminOrders;
