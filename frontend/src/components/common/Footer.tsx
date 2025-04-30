import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <nav className='footerNav'>
        <ul>
          <li><Link to="/storeInfo"><i className="bi bi-shop"></i>店舗情報</Link></li>
          <li><Link to="/qanda"><i className="bi bi-question-circle"></i>FAQ</Link></li>
          <li><Link to="/termsOfService"><i className="bi bi-file-earmark-text"></i>利用規約</Link></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;