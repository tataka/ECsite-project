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
        <div>
            <main id='regist'>
                <div>
                    <p>Regist</p>
                    <h3>会員情報</h3>
                    <p>会員メールアドレス <input type="text" name="email" value={formData.email} onChange={handleChange} /></p>
                    <p>パスワード <input type="password" name="password" value={formData.password} onChange={handleChange} /></p>
                    <h3>会員詳細情報</h3>
                    <p>名前　<input type="text" name="name" value={formData.name} onChange={handleChange} /></p>
                    <p>ローマ字　<input type="text" name="furigana" value={formData.furigana} onChange={handleChange} /></p>
                    <p>郵便番号　<input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} /></p>
                    <p>住所　<input type="text" name="address" value={formData.address} onChange={handleChange} /></p>
                    <p>電話番号　<input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} /></p>
                    <p>生年月日　<input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} /></p>
                    <p>性別　<input type="text" name="gender" value={formData.gender} onChange={handleChange} /></p>
                    <button onClick={handleSubmit}>登録</button>
                </div>
                <div>
                    <button id='change'>会員情報の変更はこちら</button>
                </div>
            </main>
        </div>
    );
};

export default Regist;
