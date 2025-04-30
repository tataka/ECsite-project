// TestLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TestLogin({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      setUser(data.user);

      localStorage.setItem('user', JSON.stringify(data.user));

      // 管理者フラグとユーザーIDをlocalStorageに保存
      localStorage.setItem('isAdmin', data.user.is_admin ? 'true' : 'false');
      localStorage.setItem('userId', data.user.id);

      // 管理者なら管理者ページへ、それ以外ならマイページへ
      if (data.user.is_admin) {
        navigate('/admin/home');
      } else {
        navigate('/testMypage');
      }

    } else {
      alert('ログイン失敗');
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="メール"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="パスワード"
      />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}

export default TestLogin;
