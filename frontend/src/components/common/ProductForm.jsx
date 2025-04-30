// src/components/ProductForm.jsx
import React, { useState } from 'react';

const ProductForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [color, setColor] = useState('');
  const [colorCode, setColorCode] = useState('');
  const [size, setSize] = useState('');
  const [sizeCode, setSizeCode] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [stock, setStock] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, product_code: productCode, color, color_code: colorCode, size, size_code: sizeCode, price, image_url: imageUrl, category, gender, stock });
    // フォームをリセット
    setName('');
    setProductCode('');
    setColor('');
    setColorCode('');
    setSize('');
    setSizeCode('');
    setPrice('');
    setImageUrl('');
    setCategory('');
    setGender('');
    setStock(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>新しい商品を登録</h2>
      <div>
        <label>商品名:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>商品コード:</label>
        <input type="text" value={productCode} onChange={(e) => setProductCode(e.target.value)} required />
      </div>
      <div>
        <label>カラー:</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div>
        <label>カラーコード:</label>
        <input type="text" value={colorCode} onChange={(e) => setColorCode(e.target.value)} />
      </div>
      <div>
        <label>サイズ:</label>
        <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
      </div>
      <div>
        <label>サイズコード:</label>
        <input type="number" value={sizeCode} onChange={(e) => setSizeCode(e.target.value)} />
      </div>
      <div>
        <label>価格:</label>
        <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} required />
      </div>
      <div>
        <label>画像URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <div>
        <label>カテゴリー:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>
        <label>性別:</label>
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
      </div>
      <div>
        <label>在庫数:</label>
        <input type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} required />
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default ProductForm;