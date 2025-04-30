import React from 'react'
import ReactDOM from 'react-dom/client'
import { CartProvider } from './context/CartContext'; // CartProvider をインポート
import { BrowserRouter } from 'react-router-dom';
// import './assets/styles/App.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* App コンポーネントを CartProvider でラップ */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);