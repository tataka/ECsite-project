import React, { useState } from 'react'

const Regist = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        furigana: '',
        postal_code: '',
        address: '',
        phone_number: '',
        birthdate: '',
        gender: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const res = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (data.success) {
            alert('登録完了');
        } else {
            alert('登録失敗: ' + data.message);
        }
    };

    return (
        <main id='regist'>
            <h3>会員情報登録</h3>
            <div>
                <p>メールアドレス</p><input type="text" name="email" value={formData.email} onChange={handleChange} />
                <p>パスワード</p><input type="password" name="password" value={formData.password} onChange={handleChange} />
                <p>名前</p><input type="text" name="name" value={formData.name} onChange={handleChange} />
                <p>ローマ字</p><input type="text" name="furigana" value={formData.furigana} onChange={handleChange} />
                <p>郵便番号</p><input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} />
                <p>住所</p><input type="text" name="address" value={formData.address} onChange={handleChange} />
                <p>電話番号</p><input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                <p>生年月日</p><input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                <p>性別</p><input type="text" name="gender" value={formData.gender} onChange={handleChange} />
                <button onClick={handleSubmit}>登録</button>
            </div>
        </main>

    );
};

export default Regist;
