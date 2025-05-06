import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const navigate = useNavigate();

  // localStorage から情報を取得
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = !!localStorage.getItem('userId'); // userIdがあればログイン中とみなす

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
    navigate('/testLogin');
  };

  return (
    <header>
      <div className="headerDiv">
        <div className="headerLogo"><Link to="/"><img src="/logo.png" alt="logo" /></Link></div>
        <h1>ONLINE Store</h1>
      </div>
      <nav className="headerNav">
        <ul>
          {!isLoggedIn && ( // ログインしてないときだけ表示
            <>
              <li><Link to="/testLogin"><i className="bi bi-unlock"></i><div>signin</div></Link></li>
              <li><Link to="/regist"><i className="bi bi-pencil-square"></i><div>signup</div></Link></li>
            </>
          )}
          {isLoggedIn && ( // ログイン中ならログアウトボタン
            <>
              <li><button onClick={handleLogout}><i class="bi bi-lock-fill"></i><div>signout</div></button></li>
              <li><Link to="/testMypage"><i class="bi bi-person-circle"></i><div>MyPage</div></Link></li>
            </>
          )}
          <li><Link to="/cart"><i className="bi bi-cart"></i> (<tt>{cartItemCount}</tt>)<div>cart</div></Link></li>
          {isAdmin && ( // 管理者ならAdmin Homeリンク
            <li><Link to="/admin/home">AdminHome</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
