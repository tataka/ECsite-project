import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from "../context/CartContext"; // ← 追加

import Category from '../components/common/Category';

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // ← カート操作関数を取得

  const query = new URLSearchParams(location.search);
  const gender = query.get("gender");
  const category = query.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/products?gender=${gender}&category=${category}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("商品取得エラー:", error);
      }
    };

    if (gender && category) {
      fetchProducts();
    }
  }, [gender, category]);

  // stock が 0 より大きい商品のみをフィルタリング
  const availableProducts = products.filter(product => product.stock > 0);

  return (
    <>
      <Category />
      <main>
        <h2>{gender} - {category} の商品一覧</h2>
        {availableProducts.length === 0 ? (
          <p>該当する商品がありません。</p>
        ) : (
          <ul className='ulProducts'>
            {/* {products.map((product) => ( */}
            {availableProducts.map((product) => (
              <li key={product.id}> {/* またはユニークになるように組み合わせる */}
                <img src={product.image_url} alt={product.name} width="150" />
                <h3>{product.name}</h3>
                <p>価格: ¥{product.price}</p>
                <p>カラー: {product.color}</p>
                <p>サイズ: {product.size}</p>
                <button onClick={() => addToCart({ ...product, quantity: 1 })}>
                  カートに追加
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default Products;
