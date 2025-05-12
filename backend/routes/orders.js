// backend/routes/orders.js
import express from 'express';
import db from '../db.cjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { cartItems, userId, email } = req.body;

  try {
    const [orderResult] = await db.execute(
      'INSERT INTO orders (user_id) VALUES (?)',
      [userId]
    );
    const orderId = orderResult.insertId;

    for (const item of cartItems) {
      await db.execute(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)',
        [orderId, item.id, item.quantity]
      );
    }

    // メール本文作成
    let emailText = `ご注文ありがとうございます。注文ID: ${orderId}\n\n`;
    emailText += '注文内容:\n';

    let totalPrice = 0;
    for (const item of cartItems) {
      const quantity = item.quantity || 1;
      const itemTotal = item.price * quantity;
      totalPrice += itemTotal;

      emailText += `・${item.name} / ${item.color} / ${item.size} - ¥${item.price} × ${quantity}点\n`;
    }

    emailText += `\n合計金額: ¥${totalPrice.toLocaleString()}`;


    // メール送信
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: '注文が確定されました',
      text: emailText,
    });

    res.status(201).json({ message: '注文確定', orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '注文エラー' });
  }
});


// 注文一覧取得（管理者用）
router.get('/', async (req, res) => {
  try {
    const [orders] = await db.execute(
      'SELECT * FROM orders ORDER BY order_date DESC'
    );
    res.json(orders);
  } catch (error) {
    console.error('注文一覧取得エラー:', error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
});

router.get('/:orderId/items', async (req, res) => {
  const { orderId } = req.params;
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.id,
        p.gender, p.category, p.name, p.product_code, 
        p.color, p.color_code, p.size, p.size_code, oi.quantity
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [orderId]);

    res.json(rows);
  } catch (err) {
    console.error('注文詳細取得エラー:', err);
    res.status(500).json({ message: 'サーバーエラー' });
  }
});

router.post('/confirm', async (req, res) => {
  const { orderId, userId } = req.body;

  try {
    // ステータスを確定に更新
    await db.execute('UPDATE orders SET status = ? WHERE id = ?', ['確定', orderId]);

    // ユーザーのメール取得
    const [[user]] = await db.execute('SELECT email FROM users WHERE id = ?', [userId]);

    // メール送信
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: '注文が確定されました',
      text: `注文ID: ${orderId} が確定されました。ありがとうございます。`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('注文確定エラー:', error);
    res.status(500).json({ success: false });
  }
});


export default router;
