// EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    email: '', name: '', furigana: '', postal_code: '',
    address: '', phone_number: '', birthdate: '', gender: '', password: ''
  });

  useEffect(() => {
    if (!userId) {
      navigate('/testLogin');
      return;
    }

    const fetchUser = async () => {
        const res = await fetch(`http://localhost:3001/api/users/${userId}`);
        const data = await res.json();
  
        // birthdate を yyyy-MM-dd 形式に変換
        if (data.birthdate) {
          const date = new Date(data.birthdate);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          data.birthdate = `${year}-${month}-${day}`;
        }
  
        setFormData(data);
      };
  
      fetchUser();
    }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      alert('情報を更新しました');
    } else {
      alert('更新失敗: ' + data.message);
    }
  };

  return (
    <main id='editUser'>
      <h3>会員情報変更</h3>
      <p>変更箇所を入力してください</p>
      <h5>メールアドレス</h5><input name="email" value={formData.email} onChange={handleChange} placeholder="メール" />
      <h5>パスワード</h5><input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="パスワード" />
      <h5>名前</h5><input name="name" value={formData.name} onChange={handleChange} placeholder="名前" />
      <h5>ローマ字</h5><input name="furigana" value={formData.furigana} onChange={handleChange} placeholder="ふりがな" />
      <h5>郵便番号</h5><input name="postal_code" value={formData.postal_code} onChange={handleChange} placeholder="郵便番号" />
      <h5>住所</h5><input name="address" value={formData.address} onChange={handleChange} placeholder="住所" />
      <h5>電話番号</h5><input name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="電話番号" />
      <h5>生年月日</h5><input name="birthdate" type="date" value={formData.birthdate} onChange={handleChange} />
      <h5>性別</h5><input name="gender" value={formData.gender} onChange={handleChange} placeholder="性別" />
      <button onClick={handleSubmit}>更新</button>
    </main>
  );
};

export default EditUser;
