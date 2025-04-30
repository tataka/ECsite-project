import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Home from './pages/Home';
import Regist from './pages/Regist';
import QandA from './pages/QandA';
import CartPage from './pages/Cart';
import StoreInfo from './pages/StoreInfo';
import TermsOfService from './pages/TermsOfService';
import TestLogin from './pages/TestLogin';
import TestMypage from './pages/TestMypage';
import OrderConfirm from './pages/OrderConfirm';
import Products from './pages/Products';

import AdminHome from './pages/AdminHome';
import AdminPage from './pages/AdminPage'; // ← Admin用の画面コンポーネント
import OrdersPage from './pages/OrdersPage'; // ← Orders用の画面コンポーネント
import OrderDetails from './pages/OrderDetails';
import StockControlSystem from './pages/StockControlSystem';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Category from './components/common/Category';
import RequireAdmin from './components/auth/RequireAdmin';

import AdminRoute from './router/AdminRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/qanda" element={<QandA />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/storeInfo" element={<StoreInfo />} />
        <Route path="/termsOfService" element={<TermsOfService />} />
        <Route path="/category" element={<Category />} />
        <Route path="/products" element={<Products />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />

        {/* ✅ フロント側の管理者・注文ページを表示 */}
        <Route path="/admin/home" element={<RequireAdmin><AdminHome /></RequireAdmin>} />
        <Route path="/admin/" element={<RequireAdmin><AdminPage /></RequireAdmin>} />
        <Route path="/orders" element={<RequireAdmin><OrdersPage /></RequireAdmin>} />
        <Route path="/admin/orders/:orderId" element={<RequireAdmin><OrderDetails /></RequireAdmin>} />
        <Route path="/admin/stock-control-system" element={<RequireAdmin><StockControlSystem /></RequireAdmin>} />

        <Route path="/testLogin" element={<TestLogin setUser={setUser} />} />
        <Route path="/testMypage" element={<TestMypage user={user} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
