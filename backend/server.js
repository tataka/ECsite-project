import express from 'express';
import cors from 'cors';
import db from './db.cjs';
import ordersRouter from './routes/orders.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// ルーティング
app.use('/api/admin', adminRoutes);
app.use('/api/orders', ordersRouter);
app.use('/api/users', userRoutes);

// ログインAPI
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.execute(
            'SELECT id, name, furigana, email, address, postal_code, phone_number, birthdate, gender, is_admin FROM users WHERE email = ? AND password = ?',
            [email, password]
        );
        if (rows.length > 0) {
            res.json({ success: true, user: rows[0] });
        } else {
            res.status(401).json({ success: false, message: '認証に失敗しました' });
        }
    } catch (error) {
        console.error('ログインAPIエラー:', error);
        res.status(500).json({ success: false, message: 'サーバーエラーが発生しました' });
    }
});

// ユーザー登録API
app.post('/api/register', async (req, res) => {
    const { email, name, furigana, postal_code, address, phone_number, birthdate, gender, password } = req.body;
    try {
        await db.execute(
            `INSERT INTO users (email, name, furigana, postal_code, address, phone_number, birthdate, gender, password)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [email, name, furigana, postal_code, address, phone_number, birthdate, gender, password]
        );
        res.status(201).json({ success: true, message: '登録が完了しました' });
    } catch (error) {
        console.error('登録APIエラー:', error);
        res.status(500).json({ success: false, message: 'データベースエラーが発生しました' });
    }
});

// 商品取得API (条件付き)
app.get('/api/products', async (req, res) => {
    const { gender, category } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];
    const conditions = [];

    if (gender) {
        conditions.push('gender = ?');
        params.push(gender);
    }

    if (category) {
        conditions.push('category = ?');
        params.push(category);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    try {
        const [rows] = await db.execute(query, params);
        res.json(rows);
    } catch (error) {
        console.error('商品取得APIエラー:', error);
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
});

// カテゴリー別商品取得API
app.get('/api/products/category/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    try {
        const [rows] = await db.execute(
            'SELECT id, name, product_code, color, color_code, size, size_code, price, image_url, category, gender FROM products WHERE category = ?',
            [categoryName]
        );
        if (rows.length > 0) {
            res.json({ products: rows });
        } else {
            res.status(404).json({ message: `カテゴリー "${categoryName}" の商品は見つかりませんでした` });
        }
    } catch (error) {
        console.error('カテゴリー別商品取得APIエラー:', error);
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
});

// 商品削除API
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: `商品ID ${id} を削除しました` });
        } else {
            res.status(404).json({ message: `商品ID ${id} は見つかりませんでした` });
        }
    } catch (error) {
        console.error('商品削除APIエラー:', error);
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
});

// 新規商品登録API
app.post('/api/products', async (req, res) => {
    const { name, product_code, color, color_code, size, size_code, price, image_url, category, gender, stock } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO products (name, product_code, color, color_code, size, size_code, price, image_url, category, gender, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, product_code, color, color_code, size, size_code, price, image_url, category, gender, stock]
        );
        res.status(201).json({ id: result.insertId, message: '商品を登録しました' });
    } catch (error) {
        console.error('新規商品登録APIエラー:', error);
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
});

// 在庫数更新API
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { stock } = req.body;
    try {
        const [result] = await db.execute('UPDATE products SET stock = ? WHERE id = ?', [stock, id]);
        if (result.affectedRows > 0) {
            res.json({ message: `商品ID ${id} の在庫数を更新しました` });
        } else {
            res.status(404).json({ message: `商品ID ${id} は見つかりませんでした` });
        }
    } catch (error) {
        console.error('在庫数更新APIエラー:', error);
        res.status(500).json({ message: 'サーバーエラーが発生しました' });
    }
});

// サーバー起動
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});