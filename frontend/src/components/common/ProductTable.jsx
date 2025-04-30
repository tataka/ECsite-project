// src/components/ProductTable.jsx
import React from 'react';

const ProductTable = ({ products, onDelete, onStockChange }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>商品名</th>
          <th>商品コード</th>
          <th>カラー</th>
          <th>カラーコード</th>
          <th>サイズ</th>
          <th>価格</th>
          <th>画像url</th>
          <th>在庫数</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.product_code}</td>
            <td>{product.color}</td>
            <td>{product.color_code}</td>
            <td>{product.size}</td>
            <td>{product.price}</td>
            <td>{product.image_url}</td>
            <td>
              <input
                type="number"
                value={product.stock}
                onChange={(e) => onStockChange(product.id, parseInt(e.target.value))}
              />
            </td>
            <td>
              <button onClick={() => onDelete(product.id)}>削除</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;