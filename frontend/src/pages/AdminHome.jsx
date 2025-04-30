import React from "react";
import { Link } from "react-router-dom";

function AdminHome() {
    return (
        <div id="root">
            <main>
                {/* mainコンテンツ内容 */}
                <p>This is the admin page of the page.</p>
                <ul>
                    <li><Link to="/admin">注文一覧ページ</Link></li>
                    <li><Link to="/admin/stock-control-system">在庫管理ページ</Link></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </main>
        </div>
    );
};

export default AdminHome;