// backend/routes/admin.js
import express from 'express';
const router = express.Router();
import db from '../db.cjs';

router.get('/orders', async (req, res) => {
    const [orders] = await db.execute('SELECT * FROM orders ORDER BY order_date DESC');
    res.json(orders);
  });
  
  router.put('/orders/:id/confirm', async (req, res) => {
    const orderId = req.params.id;
    await db.execute('UPDATE orders SET status = "確定" WHERE id = ?', [orderId]);
    res.json({ message: '注文を確定しました' });
  });
  // admin.js の最後に追加
export default router;

  