import React from "react";
import { Link } from "react-router-dom";

function AdminHome() {
    return (
        <main>
            <h2>管理者トップページ</h2>
            <ul>
                <li><Link to="/admin">注文一覧ページ</Link></li>
                <li><Link to="/admin/stock-control-system">在庫管理ページ</Link></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </main>
    );
};

export default AdminHome;