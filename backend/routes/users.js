// backend/routes/users.js
import express from 'express';
import db from '../db.cjs';

const router = express.Router();

// ユーザー情報取得
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
  res.json(rows[0]);
});

// ユーザー情報更新
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const {
    email, name, furigana, postal_code, address,
    phone_number, birthdate, gender, password
  } = req.body;

  try {
    await db.execute(`
      UPDATE users SET
        email = ?, name = ?, furigana = ?, postal_code = ?,
        address = ?, phone_number = ?, birthdate = ?, gender = ?, password = ?
      WHERE id = ?`,
      [email, name, furigana, postal_code, address, phone_number, birthdate, gender, password, userId]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('ユーザー更新エラー:', error);
    res.status(500).json({ success: false, message: '更新失敗' });
  }
});

export default router;
