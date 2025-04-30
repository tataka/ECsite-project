// StockControlSystem.jsx
import React, { useState, useEffect } from 'react';
import ProductTable from '../components/common/ProductTable';
import ProductForm from '../components/common/ProductForm';

const StockControlSystem = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/products'); // ← 修正
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`, { // ← 修正
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchProducts();
        } catch (error) {
            console.error(`Failed to delete product with ID ${id}:`, error);
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            const response = await fetch('http://localhost:3001/api/products', { // ← 修正
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to add product:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchProducts();
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    const handleStockChange = async (id, newStock) => {
        try {
            const response = await fetch(`http://localhost:3001/api/products/${id}`, { // ← 修正
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stock: newStock }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Failed to update stock for product ID ${id}:`, errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setProducts(products.map(product =>
                product.id === id ? { ...product, stock: newStock } : product
            ));
        } catch (error) {
            console.error(`Failed to update stock for product ID ${id}:`, error);
        }
    };

    return (
        <div>
            <h1>在庫管理</h1>
            <ProductForm onAdd={handleAddProduct} />
            <ProductTable
                products={products}
                onDelete={handleDeleteProduct}
                onStockChange={handleStockChange}
            />
        </div>
    );
};

export default StockControlSystem;